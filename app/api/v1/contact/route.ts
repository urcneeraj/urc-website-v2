import { handleContactOptions, handleContactPost, type ContactHandlerEnv } from "@/lib/contact/server";

// Next.js App Router entry point, including Cloudflare Workers via OpenNext.
// Read runtime variables on each request; never expose them as NEXT_PUBLIC_*.
export async function POST(request: Request): Promise<Response> {
  return handleContactPost(request, process.env as ContactHandlerEnv);
}

export async function OPTIONS(request: Request): Promise<Response> {
  return handleContactOptions(request, process.env as ContactHandlerEnv);
}
