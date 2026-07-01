import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SLUGS = [
  "claude", "gpt5", "gemini", "copilot", "xai",
  "edge-tts", "alt-text", "safevision", "pokemon-auth",
  "lodestar-price", "json-repair", "discord-shield",
];

export async function GET() {
  const resources = SLUGS.map((slug) => `https://x402-ai.vercel.app/api/${slug}`);

  return NextResponse.json({
    version: 1,
    resources,
  });
}
