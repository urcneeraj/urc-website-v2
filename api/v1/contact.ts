/**
 * Vercel Serverless Function — same contract as `functions/api/v1/contact.ts` (Cloudflare Pages).
 * Static Next export does not ship `app/api` routes; root `api/` is deployed separately by Vercel.
 */
import {
  handleContactOptions,
  handleContactPost,
  type ContactHandlerEnv,
} from "../../lib/contact/server";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  const env = process.env as unknown as ContactHandlerEnv;
  if (request.method === "OPTIONS") return handleContactOptions(request, env);
  if (request.method === "POST") return handleContactPost(request, env);
  return new Response("Method Not Allowed", { status: 405 });
}
