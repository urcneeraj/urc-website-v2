import { Redis } from "@upstash/redis/cloudflare";
import { CONTACT_API_VERSION } from "./version";
import { fieldLimits, sanitizePlainText } from "./sanitize";

export type ContactHandlerEnv = {
  WEB3FORMS_ACCESS_KEY?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  ALLOWED_ORIGINS?: string;
  CONTACT_RATE_LIMIT_IP_MONTHLY?: string;
  CONTACT_RATE_LIMIT_GLOBAL_MONTHLY?: string;
  CONTACT_SKIP_RATE_LIMIT?: string;
};

const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

function json(
  body: Record<string, unknown>,
  status: number,
  extraHeaders?: HeadersInit,
): Response {
  const headers = new Headers(extraHeaders);
  headers.set("Content-Type", `application/json; api-version=${CONTACT_API_VERSION}`);
  return new Response(JSON.stringify({ apiVersion: CONTACT_API_VERSION, ...body }), { status, headers });
}

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function secondsUntilUtcMonthEnd(now = new Date()): number {
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const lastDay = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const end = Date.UTC(y, m, lastDay, 23, 59, 59, 999);
  return Math.max(120, Math.ceil((end - now.getTime()) / 1000));
}

function corsHeaders(request: Request, env: ContactHandlerEnv): Headers {
  const headers = new Headers();
  const origin = request.headers.get("Origin");
  const allowed = parseAllowedOrigins(env.ALLOWED_ORIGINS);
  if (origin) {
    if (allowed.length === 0 || allowed.includes(origin)) {
      headers.set("Access-Control-Allow-Origin", origin);
      headers.set("Vary", "Origin");
    }
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Accept, Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return headers;
}

function originAllowed(request: Request, env: ContactHandlerEnv): boolean {
  const allowed = parseAllowedOrigins(env.ALLOWED_ORIGINS);
  if (allowed.length === 0) return true;
  const origin = request.headers.get("Origin");
  return !origin || allowed.includes(origin);
}

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isValidEmail(email: string): boolean {
  if (email.length > fieldLimits.emailMax) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function enforceRateLimits(request: Request, env: ContactHandlerEnv): Promise<Response | null> {
  if (env.CONTACT_SKIP_RATE_LIMIT === "true") return null;

  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  const now = new Date();
  const monthKey = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const ttl = secondsUntilUtcMonthEnd(now);
  const ip = clientIp(request);

  const ipLimit = Number(env.CONTACT_RATE_LIMIT_IP_MONTHLY ?? "100");
  if (Number.isFinite(ipLimit) && ipLimit > 0) {
    const ipKey = `contact:ip:${monthKey}:${ip}`;
    const ipCount = await redis.incr(ipKey);
    if (ipCount === 1) await redis.expire(ipKey, ttl);
    if (ipCount > ipLimit) {
      return json(
        { ok: false, error: "rate_limited", message: "Too many submissions from this network. Try again later." },
        429,
        corsHeaders(request, env),
      );
    }
  }

  const globalRaw = env.CONTACT_RATE_LIMIT_GLOBAL_MONTHLY?.trim();
  if (globalRaw) {
    const globalLimit = Number(globalRaw);
    if (Number.isFinite(globalLimit) && globalLimit > 0) {
      const gKey = `contact:global:${monthKey}`;
      const gCount = await redis.incr(gKey);
      if (gCount === 1) await redis.expire(gKey, ttl);
      if (gCount > globalLimit) {
        return json(
          { ok: false, error: "rate_limited", message: "Service is temporarily busy. Please try again later." },
          503,
          corsHeaders(request, env),
        );
      }
    }
  }

  return null;
}

export async function handleContactOptions(
  request: Request,
  env: ContactHandlerEnv,
): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders(request, env) });
}

export async function handleContactPost(
  request: Request,
  env: ContactHandlerEnv,
): Promise<Response> {
  const cors = corsHeaders(request, env);
  if (!originAllowed(request, env)) {
    return json({ ok: false, error: "forbidden", message: "Origin not allowed." }, 403, cors);
  }

  const accessKey = env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return json(
      { ok: false, error: "not_configured", message: "Contact endpoint is not configured (missing access key)." },
      503,
      cors,
    );
  }

  const rl = await enforceRateLimits(request, env);
  if (rl) return rl;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request", message: "Invalid form data." }, 400, cors);
  }

  const name = sanitizePlainText(String(form.get("name") ?? ""), fieldLimits.nameMax);
  const email = sanitizePlainText(String(form.get("email") ?? ""), fieldLimits.emailMax).toLowerCase();
  const phone = sanitizePlainText(String(form.get("phone") ?? ""), fieldLimits.phoneMax);
  const company = sanitizePlainText(String(form.get("company") ?? ""), fieldLimits.companyMax);
  const message = sanitizePlainText(String(form.get("message") ?? ""), fieldLimits.messageMax);

  if (!name || !email || !message) {
    return json({ ok: false, error: "validation", message: "Name, email, and message are required." }, 400, cors);
  }
  if (!isValidEmail(email)) {
    return json({ ok: false, error: "validation", message: "Please enter a valid email address." }, 400, cors);
  }

  const attachment = form.get("attachment");
  const outgoing = new FormData();
  outgoing.append("access_key", accessKey);
  outgoing.append("subject", "URC — Investor enquiry");
  outgoing.append("name", name);
  outgoing.append("email", email);
  const messageLines: string[] = [];
  if (phone) messageLines.push(`Phone: ${phone}`);
  if (company) messageLines.push(`Company: ${company}`);
  if (messageLines.length) messageLines.push("");
  messageLines.push(message);
  outgoing.append("message", messageLines.join("\n"));

  if (attachment instanceof File && attachment.size > 0) {
    if (attachment.size > MAX_ATTACHMENT_BYTES) {
      return json(
        { ok: false, error: "validation", message: `Attachment must be under ${MAX_ATTACHMENT_BYTES / (1024 * 1024)} MB.` },
        400,
        cors,
      );
    }
    outgoing.append("attachment", attachment, attachment.name || "attachment");
  }

  let upstream: Response;
  try {
    upstream = await fetch(WEB3FORMS_SUBMIT_URL, { method: "POST", body: outgoing });
  } catch {
    return json({ ok: false, error: "upstream", message: "Could not reach email service. Try again later." }, 502, cors);
  }

  let payload: { success?: boolean; message?: string };
  try {
    payload = (await upstream.json()) as typeof payload;
  } catch {
    return json({ ok: false, error: "upstream", message: "Unexpected response from email service." }, 502, cors);
  }

  if (!upstream.ok || payload.success === false) {
    return json(
      {
        ok: false,
        error: "upstream",
        message: payload.message ?? "Could not send message. Please try again.",
      },
      502,
      cors,
    );
  }

  return json({ ok: true, message: "Sent." }, 200, cors);
}
