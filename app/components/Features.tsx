"use client";

import { motion } from "framer-motion";

// Shared easing + variants — reused across all animated elements
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Single element: heading, subheading, icon, card title
const FADE_UP = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Grid container: staggers each child card in sequence
const CARD_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

// Each feature card
const CARD_ITEM = {
  hidden: { opacity: 0, y: 52 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

// Bullet list container: staggers each bullet after the card settles
const BULLET_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.28 },
  },
};

// Each bullet item
const BULLET_ITEM = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const features = [
  {
    icon: "🧭",
    title: "AI Navigation Algorithms",
    items: [
      "Advanced SLAM localization",
      "Dynamic path planning",
      "Real-time obstacle perception",
    ],
  },
  {
    icon: "⚙️",
    title: "Innovative Hardware",
    items: [
      "High-efficiency ODrive systems",
      "24V 65Ah Deep Cycle Lead Acid battery",
      "Adaptive brush pressure",
    ],
  },
  {
    icon: "☁️",
    title: "Cloud-Based Management",
    items: [
      "User-friendly fleet dashboard",
      "Visualized heatmap reports",
      "Real-time robot monitoring",
    ],
  },
];

export default function Features() {
  return (
    <section id="technology" className="py-12 md:py-16 lg:py-24">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 lg:px-12">

        {/* Section heading — fades up when it enters the viewport */}
        <motion.div
          className="text-center mb-11"
          variants={FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl leading-[1.08] tracking-[-0.03em] m-0 mb-2.5 text-slate-100 drop-shadow-[0_2px_12px_rgba(2,6,23,0.35)]">
            Core Technology
          </h2>
          <p className="mx-auto max-w-[720px] text-slate-300 font-medium leading-[1.7] m-0">
            Self-developed algorithms and innovative hardware designs.
          </p>
        </motion.div>

        {/*
          Card grid — triggers the stagger chain when it enters the viewport.
          Each card uses CARD_ITEM variants (inherited from CARD_CONTAINER trigger).
          Bullet lists cascade further via BULLET_CONTAINER / BULLET_ITEM.
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10"
          variants={CARD_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={CARD_ITEM}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)] lg:rounded-[22px] lg:p-8"
            >
              {/* Icon badge */}
              <motion.div
                variants={FADE_UP}
                className="w-[52px] h-[52px] rounded-[16px] bg-accent/[0.12] text-accent flex items-center justify-center text-[22px] mb-3.5"
              >
                {f.icon}
              </motion.div>

              {/* Card title */}
              <motion.h4
                variants={FADE_UP}
                className="m-0 mb-3 text-[1.1rem] tracking-[-0.01em] text-navy font-bold"
              >
                {f.title}
              </motion.h4>

              {/*
                Bullet list — BULLET_CONTAINER staggers bullets 0.08s apart,
                starting 0.28s after the card itself animates in.
              */}
              <motion.ul
                variants={BULLET_CONTAINER}
                className="p-0 m-0 list-none"
              >
                {f.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={BULLET_ITEM}
                    className="relative pl-[22px] text-slate-400 font-mono font-medium leading-[1.6] my-2.5 text-sm"
                  >
                    <span className="absolute left-0 top-0 font-black text-navy">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
