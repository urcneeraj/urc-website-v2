"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { fieldLimits } from "@/lib/contact/sanitize";
import { getContactApiVersion, getContactSubmitUrl } from "../lib/contactApi";

/**
 * POSTs to `/api/v1/contact` (Cloudflare Pages Function), which sanitizes input, rate-limits, and forwards to Web3Forms.
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

  const resetFeedback = useCallback(() => {
    setError(null);
    setSuccess(false);
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
    setError(null);
    setSuccess(false);
    const form = event.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      const res = await fetch(getContactSubmitUrl(), {
        method: "POST",
        body: fd,
        headers: {
          Accept: `application/json; api-version=${getContactApiVersion()}`,
        },
      });
      let data: {
        ok?: boolean;
        message?: string;
        error?: string;
        apiVersion?: string;
      };
      try {
        data = (await res.json()) as typeof data;
      } catch {
        setError("Invalid response from server. If you use `next dev`, run `npm run preview:cf` to test the contact API.");
        return;
      }
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Could not send. Please try again or email us directly.");
        return;
      }
      form.reset();
      setSuccess(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
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
      <div className="max-h-[min(92vh,900px)] w-full max-w-[620px] overflow-y-auto rounded-2xl border border-white/15 bg-midnight p-6 shadow-[0_20px_60px_rgba(19,42,65,0.45)]">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 id={`${formId}-title`} className="m-0 text-2xl font-bold text-slate-100">
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
            className="shrink-0 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-white/10"
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
          <input
            name="name"
            required
            maxLength={fieldLimits.nameMax}
            placeholder="Full Name"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="Email"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="phone"
            maxLength={fieldLimits.phoneMax}
            placeholder="Phone Number"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="company"
            maxLength={fieldLimits.companyMax}
            placeholder="Company / Organization"
            disabled={sending}
            className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <textarea
            name="message"
            required
            maxLength={fieldLimits.messageMax}
            placeholder="Tell us about your enquiry..."
            rows={4}
            disabled={sending}
            className="sm:col-span-2 rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 disabled:opacity-60"
          />
          <input
            name="attachment"
            type="file"
            disabled={sending}
            className="sm:col-span-2 rounded-xl border border-dashed border-sun/45 bg-navy/30 px-3 py-2 text-sm text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-sun file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={sending}
            className="sm:col-span-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sun px-5 py-3 text-sm font-bold text-navy shadow-[0_12px_30px_rgba(239,8,6,0.24)] disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
