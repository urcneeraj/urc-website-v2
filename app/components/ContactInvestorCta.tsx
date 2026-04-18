"use client";

import { useState } from "react";
import { InvestorEnquiryModal } from "./InvestorEnquiryModal";
import { CTA_LINK_GRADIENT_CLASS } from "../lib/cta";

export default function ContactInvestorCta() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-7">
      <button type="button" onClick={() => setOpen(true)} className={CTA_LINK_GRADIENT_CLASS}>
        Open Investor Enquiry Form
      </button>
      <InvestorEnquiryModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
