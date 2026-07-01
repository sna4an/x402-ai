import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const endpoints: Record<string, { host: string; price: string; desc: string }> = {
    "alt-text": { host: "ai-image-alt-text-generator", price: "75000", desc: "AI image alt text generator" },
    "claude": { host: "claude-ai-all-models", price: "150000", desc: "Claude AI all models" },
    "copilot": { host: "copilot11", price: "125000", desc: "GitHub Copilot AI" },
    "discord-shield": { host: "kordhub-discord-webhook-shield-formatter", price: "50000", desc: "Discord webhook shield formatter" },
    "edge-tts": { host: "streamlined-edge-tts", price: "75000", desc: "Edge text-to-speech" },
    "gemini": { host: "gemini-ai-all-models", price: "125000", desc: "Google Gemini AI all models" },
    "gpt5": { host: "gpt-5-5", price: "150000", desc: "OpenAI GPT-5 model" },
    "json-repair": { host: "kordhub-ai-json-repair-formatter", price: "50000", desc: "AI JSON repair formatter" },
    "lodestar-price": { host: "lodestar-ai-price", price: "100000", desc: "Lodestar AI price data" },
    "pokemon-auth": { host: "pokemon-card-authenticator-ai2", price: "100000", desc: "Pokemon card AI authenticator" },
    "safevision": { host: "safevision", price: "75000", desc: "SafeVision AI content moderation" },
    "xai": { host: "xai-all-models", price: "125000", desc: "xAI Grok all models" },
  };

  const paths: Record<string, any> = {};
  for (const [slug, info] of Object.entries(endpoints)) {
    const amount = (parseInt(info.price) / 1_000_000).toFixed(6);
    const op = {
      operationId: slug.replace(/-/g, "_"),
      summary: info.desc,
      tags: ["AI Models"],
      "x-payment-info": {
        price: { mode: "fixed", currency: "USD", amount },
        protocols: [{ x402: {} }],
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                messages: {
                  type: "array",
                  description: "Chat messages array",
                  items: {
                    type: "object",
                    properties: {
                      role: { type: "string" },
                      content: { type: "string" },
                    },
                  },
                },
                max_tokens: { type: "integer", description: "Max tokens", default: 1024 },
                temperature: { type: "number", description: "Temperature", default: 0.7 },
                stream: { type: "boolean", description: "Stream response", default: false },
              },
              required: ["messages"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string", description: "Response ID" },
                  choices: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        message: {
                          type: "object",
                          properties: {
                            role: { type: "string" },
                            content: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "402": { description: "Payment required" },
      },
    };
    paths[`/api/${slug}`] = { get: op, post: op };
  }

  const spec = {
    openapi: "3.1.0",
    info: {
      title: "X402-AI",
      version: "1.0.0",
      description: "Access 12 AI model APIs via x402 micropayments on Base chain.",
      "x-guidance": "POST or GET to any endpoint with messages array. Payment in USDC on Base chain.",
      contact: { email: "sna4an@proton.me" },
    },
    servers: [{ url: "https://x402-ai-peach.vercel.app" }],
    paths,
  };

  return NextResponse.json(spec);
}
