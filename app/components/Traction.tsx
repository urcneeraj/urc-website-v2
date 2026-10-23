"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ExpandingButton from "./ExpandingButton";
import { InvestorEnquiryModal } from "./InvestorEnquiryModal";
import { CTA_GRADIENT_BG, CTA_GRADIENT_TEXT } from "../lib/cta";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const FADE_UP = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

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

  return (
    <section id="traction" className="py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-4 md:px-6 lg:px-12">
        <motion.div
          className="mb-11 text-center"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="m-0 mb-2.5 text-3xl leading-[1.08] tracking-[-0.03em] text-slate-100 drop-shadow-[0_2px_12px_rgba(2,6,23,0.35)] md:text-5xl lg:text-7xl">
            Traction &amp; Scale Roadmap
          </h2>
          <p className="mx-auto m-0 max-w-[720px] font-semibold leading-[1.7] text-slate-300">
            From prototype to expansion — ready for multi-market deployment.
          </p>
        </motion.div>

        <motion.div
          className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-11"
          variants={STEP_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((s) => (
            <motion.div
              key={s.badge}
              variants={STEP_ITEM}
              className="rounded-[18px] border border-black/[0.12] bg-white/[0.92] p-[22px_18px] shadow-[0_10px_30px_rgba(2,6,23,0.06)] lg:rounded-[22px] lg:p-[28px_22px]"
            >
              <span className="inline-flex h-7 items-center justify-center rounded-full bg-accent/[0.12] px-2.5 font-black text-[12px] uppercase tracking-[0.06em] text-accent">
                {s.badge}
              </span>
              <div className="mt-3 font-black leading-[1.25] text-navy">{s.title}</div>
              <div className="mt-2 text-sm font-medium leading-[1.7] text-slate-500">{s.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-9 text-center"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.3 }}
        >
          <ExpandingButton
            text="Request Investor Briefing"
            color={CTA_GRADIENT_BG}
            className={`px-6 py-3.5 text-sm ${CTA_GRADIENT_TEXT}`}
            onComplete={() => setOpen(true)}
          />
          <p className="mb-0 mt-3.5 font-semibold text-slate-500">
            We will share the full pitch deck and deployment roadmap.
          </p>
        </motion.div>

        <InvestorEnquiryModal open={open} onClose={() => setOpen(false)} />
      </div>
    </section>
  );
}
