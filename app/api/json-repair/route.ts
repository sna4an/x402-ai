import { NextRequest } from "next/server";
import { proxy } from "../../../lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "kordhub-ai-json-repair-formatter", "50000"); }
export async function POST(req: NextRequest) { return proxy(req, "kordhub-ai-json-repair-formatter", "50000"); }
