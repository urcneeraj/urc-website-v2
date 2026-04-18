import { CONTACT_API_VERSION } from "@/lib/contact/version";

/**
 * Versioned contact submission endpoint (served by Cloudflare Pages Function `functions/api/v1/contact.ts`).
 * Use a relative URL so the same build works on any host; override for unusual proxies via NEXT_PUBLIC_CONTACT_API_BASE.
 */
export function getContactSubmitUrl(): string {
  const base = (process.env.NEXT_PUBLIC_CONTACT_API_BASE ?? "").replace(/\/$/, "");
  return `${base}/api/v1/contact`;
}

export function getContactApiVersion(): typeof CONTACT_API_VERSION {
  return CONTACT_API_VERSION;
}
