import { NextRequest } from "next/server";
import { proxy } from "../../../lib/proxy";

export async function GET(req: NextRequest) { return proxy(req, "ai-image-alt-text-generator", "75000"); }
export async function POST(req: NextRequest) { return proxy(req, "ai-image-alt-text-generator", "75000"); }
