import { NextRequest } from "next/server";
import { proxy } from "../../../lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "claude-ai-all-models", "150000"); }
export async function POST(req: NextRequest) { return proxy(req, "claude-ai-all-models", "150000"); }
