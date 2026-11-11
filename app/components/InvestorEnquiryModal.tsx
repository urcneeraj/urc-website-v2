"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { fieldLimits } from "@/lib/contact/sanitize";
// Public form routing identifier; not an account API secret.
const FORM_ACCESS_KEY = "63f508b2-ab43-4a2d-bd0a-a3f473b8fbc0";

/**
 * Uses the supported free-plan browser endpoint; Web3Forms validates hCaptcha before accepting mail.
 */
export function InvestorEnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const formId = useId();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);
  const submittingRef = useRef(false);

  const resetFeedback = useCallback(() => {
    setError(null);
    setSuccess(false);
    setCaptchaToken("");
    captchaRef.current?.resetCaptcha();
  }, []);

  useEffect(() => {
    if (!success) return;
    const t = window.setTimeout(() => setSuccess(false), 6000);
    return () => window.clearTimeout(t);
  }, [success]);

  useEffect(() => {
    if (!open) resetFeedback();
  }, [open, resetFeedback]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;
    if (!captchaToken) {
      setError("Please complete the human verification before sending.");
      return;
    }
    setError(null);
    setSuccess(false);
    const form = event.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("botcheck") ?? "").trim()) {
      setError("Submission rejected.");
      return;
    }
    fd.set("access_key", FORM_ACCESS_KEY);
    fd.set("subject", "URC Investor enquiry");
    fd.set("h-captcha-response", captchaToken);
    submittingRef.current = true;
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(fd)),
        signal: AbortSignal.timeout(25000),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status === 429) {
        setError("Too many attempts. Please wait a minute before trying again.");
        return;
      }
      let data: {
        success?: boolean;
        message?: string;
        error?: string;
        apiVersion?: string;
      };
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setError("We could not send your enquiry. Please try again later or email urcrobotics@gmail.com.");
        return;
      }
      if (!res.ok || data.success !== true) {
        setError(data.message ?? "Could not send. Please try again or email us directly.");
        return;
      }
      form.reset();
      setSuccess(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      submittingRef.current = false;
      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
      setSending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1200] grid place-items-center bg-navy/65 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${formId}-title`}
    >
      <div className="max-h-[calc(100dvh-2rem)] w-full max-w-[620px] overflow-y-auto rounded-2xl border border-white/15 bg-midnight p-4 sm:p-6 shadow-[0_20px_60px_rgba(19,42,65,0.45)]">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 break-words">
            <h3 id={`${formId}-title`} className="m-0 text-xl sm:text-2xl font-bold text-slate-100">
              Investor Enquiry Form
            </h3>
            <p className="mt-1 mb-0 font-mono text-xs text-slate-300">
              Submissions are delivered to urcrobotics@gmail.com (via Web3Forms).
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetFeedback();
              onClose();
            }}
            className="shrink-0 rounded-full border border-white/20 px-3 py-3 text-xs font-semibold text-slate-200 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {success ? (
          <p className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100" role="status">
            Message sent. The form has been cleared — we will get back to you at the email you provided.
          </p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-xl border border-red-500/40 bg-red-950/35 px-4 py-3 text-sm text-red-100" role="alert">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="hidden" aria-hidden="true">
            <label>Leave this field empty<input name="botcheck" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <input
            name="name"
            aria-label="Full Name"
            required
            maxLength={fieldLimits.nameMax}
            placeholder="Full Name"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 min-w-0 w-full px-3 py-2 text-base text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="email"
            aria-label="Email"
            type="email"
            required
            maxLength={254}
            placeholder="Email"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 min-w-0 w-full px-3 py-2 text-base text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="phone"
            aria-label="Phone Number"
            maxLength={fieldLimits.phoneMax}
            placeholder="Phone Number"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 min-w-0 w-full px-3 py-2 text-base text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="company"
            aria-label="Company / Organization"
            maxLength={fieldLimits.companyMax}
            placeholder="Company / Organization"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 min-w-0 w-full px-3 py-2 text-base text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <textarea
            name="message"
            aria-label="Your enquiry"
            required
            maxLength={fieldLimits.messageMax}
            placeholder="Tell us about your enquiry..."
            rows={4}
            disabled={sending}
            className="sm:col-span-2 rounded-xl border border-white/20 bg-navy/40 min-w-0 w-full px-3 py-2 text-base text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <p className="sm:col-span-2 m-0 text-xs text-slate-300">For attachments, email <a className="underline" href="mailto:urcrobotics@gmail.com">urcrobotics@gmail.com</a>.</p>
          <div className="sm:col-span-2">
            <HCaptcha
              ref={captchaRef}
              sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
              reCaptchaCompat={false}
              theme="dark"
              size="compact"
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken("")}
              onError={() => {
                setCaptchaToken("");
                setError("Human verification could not load. Please retry or email us directly.");
              }}
            />
          </div>
          <button
            type="submit"
            disabled={sending || !captchaToken}
            className="sm:col-span-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sun px-5 py-3 text-sm font-bold text-navy shadow-[0_12px_30px_rgba(239,8,6,0.24)] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
