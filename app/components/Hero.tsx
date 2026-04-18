"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ExpandingButton from "./ExpandingButton";
import RobotDemoModal from "./RobotDemoModal";
import { CTA_GRADIENT_BG, CTA_GRADIENT_TEXT } from "../lib/cta";
import { analyzeHeroSlide, type HeroOverlayAnalysis } from "./heroSlideAnalysis";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const POSTER = "/assets/Version_4_2026-Feb-21_04-23-21PM-000_CustomizedView23273657020.png";

/**
 * Hero carousel — delete any entry you do not want (remove the whole `{ ... }` block).
 *
 * | # | File (public/assets/…) | Heading | Subheading |
 * |---|------------------------|---------|------------|
 * | 1 | Gemini_Generated_Image_nr520xnr520xnr52.png | Autonomous Cleaning Software | Fleet dashboards… |
 * | 2 | Gemini_Generated_Image_e1q730e1q730e1q7.png | NAV2 and Autonomous Cleaning | ROS 2 & Nav2… |
 * | 3 | Gemini_Generated_Image_rttfkprttfkprttf.png | Seamless Cleaning | Edge-to-edge… |
 * | 4 | Gemini_Generated_Image_7seurf7seurf7seu.png | Too.. Much Ease | Simple start/stop… |
 * | 5 | Gemini_Generated_Image_33kvc533kvc533kv.png | All Day Battery Life | Li-ion power… |
 * | 6 | Gemini_Generated_Image_4wkwsm4wkwsm4wkw.png | Always Ready | Scheduled missions… |
 * | 7 | Gemini_Generated_Image_t0u4pvt0u4pvt0u4.png | Autonomous Cleaning Software | One platform… |
 * | 8 | Gemini_Generated_Image_unnu4ounnu4ounnu.png | NAV2 and Autonomous Cleaning | Pure pursuit… |
 */
const HERO_SLIDES = [
  {
    src: "/assets/Gemini_Generated_Image_nr520xnr520xnr52.png",
    title: "Autonomous Cleaning Software",
    subtitle:
      "Fleet dashboards, mission telemetry, and operator workflows—so every site runs on one coherent software layer.",
  },
  {
    src: "/assets/Gemini_Generated_Image_e1q730e1q730e1q7.png",
    title: "NAV2 and Autonomous Cleaning",
    subtitle:
      "ROS 2 & Nav2 stack with LiDAR SLAM algorithm",
  },
  {
    src: "/assets/Gemini_Generated_Image_rttfkprttfkprttf.png",
    title: "Seamless Cleaning",
    subtitle:
      "Edge-to-edge passes and steady downforce for a uniform finish shift after shift",
  },
  {
    src: "/assets/Gemini_Generated_Image_7seurf7seurf7seu.png",
    title: "Too.. Much Ease",
    subtitle:
      "Simple start/stop flows and clear status—teams adopt it fast",
  },
  {
    src: "/assets/Gemini_Generated_Image_33kvc533kvc533kv.png",
    title: "All Day Battery Life",
    subtitle:
      "Li-ion power that efficiently drive electronics built for 6–8 hour runs in real commercial environments.",
  },
  {
    src: "/assets/Gemini_Generated_Image_4wkwsm4wkwsm4wkw.png",
    title: "Always Ready",
    subtitle:
      "Scheduled missions, health telemetry so the unit is charged, stocked, and deployable on demand.",
  },
  {
    src: "/assets/Gemini_Generated_Image_t0u4pvt0u4pvt0u4.png",
    title: "Autonomous Cleaning Software",
    subtitle:
      "One platform to monitor routes, incidents, and performance—purpose-built for high-traffic spaces.",
  },
  {
    src: "/assets/Gemini_Generated_Image_unnu4ounnu4ounnu.png",
    title: "NAV2 and Autonomous Cleaning",
    subtitle:
      "Pure pursuit paths, obstacle negotiation, and safety-first behaviors tuned for industrial floor layouts.",
  },
] as const;

export default function Hero() {
  const [robotDemoOpen, setRobotDemoOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [brokenSlides, setBrokenSlides] = useState<boolean[]>(() => Array(HERO_SLIDES.length).fill(false));
  const [overlay, setOverlay] = useState<HeroOverlayAnalysis | null>(null);

  const activeSlide = useMemo(() => HERO_SLIDES[slide] ?? HERO_SLIDES[0], [slide]);
  const activeSrc = activeSlide.src;

  useEffect(() => {
    let cancelled = false;
    setOverlay(null);
    analyzeHeroSlide(activeSrc)
      .then((o) => {
        if (!cancelled) setOverlay(o);
      })
      .catch(() => {
        if (!cancelled) setOverlay({ x: 2, y: 0, luminance: 0.2, detailScore: 0 });
      });
    return () => {
      cancelled = true;
    };
  }, [activeSrc]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => {
        if (brokenSlides.every(Boolean)) return 0;
        let next = (s + 1) % HERO_SLIDES.length;
        for (let i = 0; i < HERO_SLIDES.length; i++) {
          if (!brokenSlides[next]) return next;
          next = (next + 1) % HERO_SLIDES.length;
        }
        return 0;
      });
    }, 3000);
    return () => window.clearInterval(id);
  }, [brokenSlides]);

  const goNext = () =>
    setSlide((s) => {
      if (brokenSlides.every(Boolean)) return 0;
      let next = (s + 1) % HERO_SLIDES.length;
      for (let i = 0; i < HERO_SLIDES.length; i++) {
        if (!brokenSlides[next]) return next;
        next = (next + 1) % HERO_SLIDES.length;
      }
      return 0;
    });

  const goPrev = () =>
    setSlide((s) => {
      if (brokenSlides.every(Boolean)) return 0;
      let next = (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
      for (let i = 0; i < HERO_SLIDES.length; i++) {
        if (!brokenSlides[next]) return next;
        next = (next - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
      }
      return 0;
    });

  return (
    <>
    <motion.section
      id="home"
      className="relative min-h-screen overflow-hidden pt-[88px] md:pt-[92px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="absolute inset-0">
        {/* Fallback poster (always present) */}
        <img
          src={POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />

        {HERO_SLIDES.map((s, idx) => (
          <img
            key={s.src}
            src={s.src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              idx === slide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={idx !== slide}
            onError={() => {
              setBrokenSlides((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }}
          />
        ))}
        {/* No overlays/gradients: keep hero images true-color */}

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous hero image"
          className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/60 bg-navy/70 px-3.5 py-2.5 text-sm font-bold text-slate-100 shadow-md backdrop-blur-sm transition-colors hover:bg-navy/85"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next hero image"
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/60 bg-navy/70 px-3.5 py-2.5 text-sm font-bold text-slate-100 shadow-md backdrop-blur-sm transition-colors hover:bg-navy/85"
        >
          →
        </button>
      </div>

      {/* Copy sits in the calmest region per slide; colors contrast with local background luminance */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {(() => {
          const lum = overlay?.luminance ?? 0.22;
          const useDarkFg = lum > 0.52;
          const titleColor = useDarkFg ? "#0f172a" : "#f8fafc";
          const subColor = useDarkFg ? "#1e293b" : "#e2e8f0";
          const labelColor = useDarkFg ? "#334155" : "#cbd5e1";
          const shadowStyle = useDarkFg
            ? "0 1px 2px rgba(255,255,255,0.85), 0 2px 14px rgba(255,255,255,0.4)"
            : "0 1px 2px rgba(0,0,0,0.9), 0 2px 14px rgba(0,0,0,0.55)";
          const px = overlay?.x ?? 2;
          const py = overlay?.y ?? 0;
          const detail = overlay?.detailScore ?? 0.5;
          const titleSize =
            detail < 0.42 ? "clamp(22px,3.9vw,58px)" : "clamp(18px,3.2vw,52px)";
          const subSize = detail < 0.42 ? "clamp(12px,1.45vw,17px)" : "clamp(11px,1.3vw,16px)";

          return (
            <motion.div
              key={`${slide}-${px}-${py}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className={cn(
                "pointer-events-auto absolute z-20 w-[min(92vw,560px)] max-w-[min(92vw,560px)] px-4",
                px === 0 && "left-0 text-left md:left-2",
                px === 1 && "left-1/2 -translate-x-1/2 text-center",
                px === 2 && "right-0 text-right md:right-2",
                py === 0 && "top-[calc(88px+8px)] md:top-[calc(92px+12px)]",
                py === 1 && "top-[42%] -translate-y-1/2",
                py === 2 && "bottom-[7.5rem] md:bottom-[8rem]",
              )}
            >
              <p
                className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] md:text-xs"
                style={{ color: labelColor, textShadow: shadowStyle }}
              >
                URC X40 Platform
              </p>
              <motion.h1
                key={activeSlide.title}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mb-4 pb-0.5 font-bold leading-[1.06] tracking-[-0.03em]"
                style={{
                  color: titleColor,
                  textShadow: shadowStyle,
                  fontSize: titleSize,
                }}
              >
                {activeSlide.title}
              </motion.h1>
              <p
                className="mb-2 font-mono leading-[1.8]"
                style={{
                  color: subColor,
                  textShadow: shadowStyle,
                  fontSize: subSize,
                }}
              >
                {activeSlide.subtitle}
              </p>
            </motion.div>
          );
        })()}
      </div>

      <div className="absolute inset-x-0 bottom-5 z-40 flex justify-center px-4">
        <div className="flex items-center gap-3">
          <ExpandingButton
            href="/x40"
            text="Explore X40"
            color={CTA_GRADIENT_BG}
            className={`px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm ${CTA_GRADIENT_TEXT}`}
          />
          <ExpandingButton
            onComplete={() => setRobotDemoOpen(true)}
            text="Watch In Action"
            color="bg-slate-900"
            className="border border-slate-200/50 px-4 py-2 text-xs font-semibold text-slate-100 md:px-5 md:py-2.5 md:text-sm"
          />
        </div>
      </div>
    </motion.section>
    <RobotDemoModal open={robotDemoOpen} onClose={() => setRobotDemoOpen(false)} />
    </>
  );
}
