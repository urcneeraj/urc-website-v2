/** Max lengths aligned with `lib/contact/server` validation. */
export const fieldLimits = {
  nameMax: 120,
  phoneMax: 40,
  companyMax: 160,
  messageMax: 8000,
  emailMax: 254,
} as const;

export function clampText(input: string, max: number): string {
  const normalized = input.replace(/\r\n/g, "\n").trim();
  if (normalized.length <= max) return normalized;
  return normalized.slice(0, max);
}

/** Strip ASCII control chars except tab / LF / CR (message may be multi-line). */
export function sanitizePlainText(input: string, max: number): string {
  const clamped = clampText(input, max);
  return clamped.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}
