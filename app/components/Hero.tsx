"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    tagline: "URC X40 Platform",
    title: "The Future Of Floor Care",
    desc: "Experience intelligent, data-driven autonomous cleaning built specifically for massive commercial and industrial spaces.",
    cta: { text: "Explore X40", href: "/x40" },
    img: "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/Version_4_2026-Feb-21_04-23-21PM-000_CustomizedView23273657020.png",
    alt: "URC X40",
  },
  {
    tagline: "Advanced AI Navigation",
    title: "Flawless Path Precision",
    desc: "Powered by custom ROS 2 Nav2 architecture and 3D LiDAR, the X40 adapts to highly dynamic environments in real-time without missing a spot.",
    cta: { text: "See Technology", href: "/x40#navigation" },
    img: "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/Version_4_2026-Feb-21_01-59-46PM-000_CustomizedView54592678928.png",
    alt: "URC X40 Navigation",
  },
  {
    tagline: "Heavy-Duty Hardware",
    title: "Uncompromising Power",
    desc: "Equipped with ODrive motor controllers and an industrial scrubber deck to lift stubborn grime effortlessly while maintaining maximum energy efficiency.",
    cta: { text: "View Specifications", href: "/x40#specs" },
    img: "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/Version_4_2026-Feb-21_02-33-14PM-000_CustomizedView15451423060.png",
    alt: "URC X40 Hardware",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % slides.length),
    []
  );

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] overflow-hidden pt-[86px]"
      style={{
        background:
          "radial-gradient(900px 500px at 15% 10%, rgba(0, 179, 166, 0.18), transparent 60%), linear-gradient(135deg, #fdfdfd 0%, #f0f4f8 100%)",
      }}
    >
      {/* decorative orb (replaces ::after pseudo-element) */}
      <div
        className="absolute -top-[200px] -right-[200px] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.25), transparent 60%)",
        }}
      />

      {slides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={i}
            className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
              isActive ? "opacity-100 visible z-10" : "opacity-0 invisible"
            }`}
          >
            <div className="max-w-[1180px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-[46px]">
              {/* Text column */}
              <div
                className={`flex-1 min-w-0 transition-all duration-1000 delay-300 ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <h2 className="font-black text-[13px] tracking-[0.16em] uppercase text-navy/80 mb-3.5 m-0">
                  {slide.tagline}
                </h2>
                <h1 className="text-[3.3rem] leading-[1.05] tracking-[-0.03em] m-0 mb-3.5 text-navy">
                  {slide.title}
                </h1>
                <p className="text-muted font-medium text-base leading-[1.7] mb-[22px] max-w-[560px] m-0">
                  {slide.desc}
                </p>
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-6 py-3.5 text-[15px] border border-transparent bg-gradient-to-br from-accent to-[#0ea5e9] text-white shadow-[0_18px_50px_rgba(0,179,166,0.18)] transition-transform hover:-translate-y-px"
                >
                  {slide.cta.text}
                </Link>
              </div>

              {/* Image column */}
              <div className="shrink-0 w-full lg:w-[460px] lg:max-w-[520px] flex items-center justify-center min-h-[420px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className={`w-auto max-w-full h-auto max-h-[72vh] object-contain rounded-[18px] shadow-[0_24px_80px_rgba(2,6,23,0.2)] transition-transform duration-[1500ms] ${
                    isActive ? "scale-100" : "scale-95"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)" }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-[4px] cursor-pointer border-none transition-all duration-300 ${
              i === active ? "w-[50px] bg-accent" : "w-[30px] bg-navy/[0.15]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
