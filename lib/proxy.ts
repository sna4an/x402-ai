import { NextRequest, NextResponse } from "next/server";

const TREASURY = "0x5e6E0aa1dE2FD4A4def32CD39aD3F775461E512c";
const FACILITATOR_URL = "https://facilitator.payai.network";

export async function proxy(req: NextRequest, host: string, price: string) {
  const paymentHeader = req.headers.get("PAYMENT-SIGNATURE");
  if (!paymentHeader) {
    const payload = Buffer.from(
      JSON.stringify({
        x402Version: 2,
        accepts: [
          {
            scheme: "exact",
            network: "eip155:8453",
            maxAmountRequired: price,
            resource: req.url,
            description: "Paid API endpoint",
            mimeType: "application/json",
            payTo: process.env.EVM_ADDRESS || TREASURY,
            maxTimeoutSeconds: 300,
            extra: { name: "USD Coin", version: "2" },
          },
        ],
    extensions: {
      bazaar: {
        info: {
          input: {
            type: "http",
            method: "POST",
            bodyType: "json",
            body: {
              type: "object",
              properties: {
                query: { type: "string", description: "Input parameter" }
              }
            }
          },
          output: {
            type: "object",
            properties: {
              result: { type: "object", description: "API response data" }
            },
            example: { result: { data: "example response" } }
          }
        },
        schema: {
          type: "object",
          properties: {
            result: { type: "object", description: "API response data" }
          }
        }
      }
    }
      })
    ).toString("base64");
    return NextResponse.json(
      {},
      { status: 402, headers: { "Payment-Required": payload } }
    );
  }

  // Verify payment with PayAI facilitator
  try {
    const verifyResp = await fetch(`${FACILITATOR_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x402Version: 2,
        paymentPayload: paymentHeader,
        paymentRequirements: {
          scheme: "exact",
          network: "eip155:8453",
          maxAmountRequired: price,
          resource: req.url,
          payTo: process.env.EVM_ADDRESS || TREASURY,
          maxTimeoutSeconds: 300,
          extra: { name: "USD Coin", version: "2" },
        },
      }),
    });
    const verifyData = await verifyResp.json();
    if (!verifyData.valid) {
      return NextResponse.json(
        { error: "Payment verification failed", details: verifyData.invalidReason },
        { status: 402 }
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      { error: "Payment verification error", message: e.message },
      { status: 502 }
    );
  }

  // Proxy to RapidAPI
  const rapidKey = process.env.RAPIDAPI_KEY || "";
  const url = new URL(req.url);
  const pathParts = url.pathname.split("/").filter(Boolean);
  const subPath = pathParts.length > 2 ? "/" + pathParts.slice(2).join("/") : "";
  const targetUrl = `https://${host}.p.rapidapi.com${subPath}${url.search}`;

  const headers: Record<string, string> = {
    "x-rapidapi-key": rapidKey,
    "x-rapidapi-host": `${host}.p.rapidapi.com`,
  };

  const init: RequestInit = { method: req.method, headers };
  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  try {
    const resp = await fetch(targetUrl, init);
    const data = await resp.text();

    // Settle payment with PayAI facilitator
    try {
      await fetch(`${FACILITATOR_URL}/settle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x402Version: 2,
          paymentPayload: paymentHeader,
          paymentRequirements: {
            scheme: "exact",
            network: "eip155:8453",
            maxAmountRequired: price,
            resource: req.url,
            payTo: process.env.EVM_ADDRESS || TREASURY,
            maxTimeoutSeconds: 300,
            extra: { name: "USD Coin", version: "2" },
          },
        }),
      });
    } catch (_) {
      // Settle failure is non-blocking
    }

    return new NextResponse(data, {
      status: resp.status,
      headers: { "Content-Type": resp.headers.get("Content-Type") || "application/json" },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}
