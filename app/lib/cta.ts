/**
 * Primary yellow CTA gradient — matches “Open Investor Enquiry Form” on /contact.
 * Use `color` on ExpandingButton; pair with `CTA_GRADIENT_TEXT` for navy label text.
 */
export const CTA_GRADIENT_BG = "bg-gradient-to-br from-accent to-sun";

export const CTA_GRADIENT_TEXT =
  "font-bold text-navy shadow-[0_12px_30px_rgba(239,8,6,0.24)] border border-transparent";

/** Plain <a> / <Link> pill (rounded-full) — same look as above */
export const CTA_LINK_GRADIENT_CLASS = `${CTA_GRADIENT_BG} inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-navy shadow-[0_12px_30px_rgba(239,8,6,0.24)] hover:-translate-y-px transition-transform`;
