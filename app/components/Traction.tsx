"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ExpandingButton from "./ExpandingButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Staggers each step card 0.12s after the previous
const STEP_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const STEP_ITEM = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const steps = [
  {
    badge: "Step 1",
    title: "Pilot testing (Hospitality)",
    desc: "Service bots tested in hospitality operations.",
  },
  {
    badge: "Step 2",
    title: "Prototype completed",
    desc: "Navigation + LiDAR integrated for autonomous behavior.",
  },
  {
    badge: "Step 3",
    title: "Launch first 2 models",
    desc: "Initial roll-out planned after integration readiness.",
  },
  {
    badge: "Vision",
    title: "Global Scale",
    desc: "Phase 1: Pan-India expansion across Tier-1 and Tier-2 cities. Phase 2: Global export to MENA and SE Asia markets.",
  },
];

export default function Traction() {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get("attachment") as File | null;
    const subject = encodeURIComponent("Investor Briefing Request");
    const body = encodeURIComponent(
      `Name: ${form.get("name") ?? ""}\n` +
        `Email: ${form.get("email") ?? ""}\n` +
        `Phone: ${form.get("phone") ?? ""}\n` +
        `Company: ${form.get("company") ?? ""}\n` +
        `Enquiry: ${form.get("message") ?? ""}\n` +
        `Attachment: ${file && file.name ? file.name : "Not attached in-browser; please add this file manually in email client."}`
    );
    window.location.href = `mailto:urcrobotics@gmail.com?subject=${subject}&body=${body}`;
    setOpen(false);
  }

  return (
    <section id="traction" className="py-12 md:py-16 lg:py-24">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 lg:px-12">

        {/* Section heading */}
        <motion.div
          className="text-center mb-11"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl leading-[1.08] tracking-[-0.03em] m-0 mb-2.5 text-slate-100 drop-shadow-[0_2px_12px_rgba(2,6,23,0.35)]">
            Traction &amp; Scale Roadmap
          </h2>
          <p className="mx-auto max-w-[720px] text-slate-300 font-semibold leading-[1.7] m-0">
            From prototype to expansion — ready for multi-market deployment.
          </p>
        </motion.div>

        {/* Step cards — stagger left-to-right as they enter the viewport */}
        <motion.div
          className="mt-9 md:mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={STEP_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.badge}
              variants={STEP_ITEM}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-[22px_18px] shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              <span className="inline-flex items-center justify-center h-7 px-2.5 rounded-full bg-accent/[0.12] text-accent font-black text-[12px] uppercase tracking-[0.06em]">
                {s.badge}
              </span>
              <div className="mt-3 font-black leading-[1.25] text-navy">{s.title}</div>
              <div className="mt-2 text-slate-500 font-medium leading-[1.7] text-sm">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA block — fades up after the step cards */}
        <motion.div
          className="text-center mt-9"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.3 }}
        >
          <ExpandingButton
            text="Request Investor Briefing"
            color="bg-gradient-to-br from-accent to-sun"
            className="px-6 py-3.5 text-sm font-bold text-navy"
            onComplete={() => setOpen(true)}
          />
          <p className="text-slate-500 font-semibold mt-3.5 mb-0">
            We will share the full pitch deck and deployment roadmap.
          </p>
        </motion.div>

        {open ? (
          <div className="fixed inset-0 z-[1200] grid place-items-center bg-navy/65 p-4">
            <div className="w-full max-w-[620px] rounded-2xl border border-white/15 bg-midnight p-6 shadow-[0_20px_60px_rgba(19,42,65,0.45)]">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="m-0 text-2xl font-bold text-slate-100">Investor Enquiry Form</h3>
                  <p className="mt-1 mb-0 font-mono text-xs text-slate-300">
                    Submit your details and we will reach you with the briefing pack.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-slate-200 hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input name="name" required placeholder="Full Name" className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400" />
                <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400" />
                <input name="phone" placeholder="Phone Number" className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400" />
                <input name="company" placeholder="Company / Organization" className="rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400" />
                <textarea name="message" required placeholder="Tell us about your enquiry..." rows={4} className="sm:col-span-2 rounded-xl border border-white/20 bg-navy/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400" />
                <input name="attachment" type="file" className="sm:col-span-2 rounded-xl border border-dashed border-sun/45 bg-navy/30 px-3 py-2 text-sm text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-sun file:px-3 file:py-1 file:text-xs file:font-semibold file:text-navy" />
                <button
                  type="submit"
                  className="sm:col-span-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-accent to-sun px-5 py-3 text-sm font-bold text-navy shadow-[0_12px_30px_rgba(239,8,6,0.26)]"
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}
