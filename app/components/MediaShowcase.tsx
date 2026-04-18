"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const gallery: { src: string; alt: string }[] = [
  {
    src: "/assets/x40-warehouse-aisle-gallery.png",
    alt: "URC X40 autonomous floor scrubber in a large warehouse with industrial shelving and aisle lighting",
  },
  {
    src: "/assets/Version_4_2026-Mar-20_02-46-12PM-000_CustomizedView8721837951.png",
    alt: "URC X40 new premium render",
  },
  {
    src: "/assets/Version_4_2026-Feb-21_06-23-11PM-000_CustomizedView27146563509.png",
    alt: "URC X40 rear render",
  },
  {
    src: "/assets/Version_4_2026-Mar-20_02-43-14PM-000_CustomizedView36561767732.png",
    alt: "URC X40 updated hero render",
  },
  {
    src: "/assets/Version_4_2026-Feb-21_04-25-36PM-000_CustomizedView51850991782.png",
    alt: "URC X40 angled render",
  },
  {
    src: "/assets/Version_4_2026-Feb-21_04-23-21PM-000_CustomizedView23273657020.png",
    alt: "URC X40 hero render",
  },
  {
    src: "/assets/Version_4_2026-Feb-21_02-33-14PM-000_CustomizedView15451423060.png",
    alt: "URC X40 side render",
  },
];

export default function MediaShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  const active = gallery[activeIndex];
  const goNext = () => setActiveIndex((prev) => (prev + 1) % gallery.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <section className="bg-offwhite py-[84px]" id="media-library">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-10 text-center">
          <h2 className="m-0 mb-2.5 text-[2.2rem] tracking-[-0.02em] text-navy">Design Renders & Brochures</h2>
          <p className="mx-auto max-w-[760px] text-sm font-medium leading-[1.7] text-black">
            Production-grade visuals and downloadable product documents for engineering, sales, and deployment teams.
          </p>
        </div>

        {/* Auto-rolling hero frame: advances every 4 seconds */}
        <div className="relative left-1/2 right-1/2 mb-4 w-screen -translate-x-1/2 overflow-hidden bg-white">
          <div className="relative aspect-[16/9] w-full">
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="z-[1] object-cover object-center"
              priority={activeIndex === 0}
            />

            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous render"
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/60 bg-navy/70 px-3.5 py-2.5 text-sm font-bold text-slate-100 shadow-md backdrop-blur-sm transition-colors hover:bg-navy/85"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next render"
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/60 bg-navy/70 px-3.5 py-2.5 text-sm font-bold text-slate-100 shadow-md backdrop-blur-sm transition-colors hover:bg-navy/85"
            >
              →
            </button>

            <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-full border border-white/30 bg-navy/45 px-3 py-1.5 backdrop-blur-sm">
            {gallery.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show render ${idx + 1}`}
                className={`h-2 rounded-full border transition-all ${idx === activeIndex ? "w-10 border-accent/60 bg-accent" : "w-5 border-navy/20 bg-navy/25"}`}
              />
            ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            href="/assets/v5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-sun/35 bg-gradient-to-br from-[#0f2a43] via-[#1b3550] to-[#1a3148] p-5 text-slate-100 shadow-[0_12px_34px_rgba(7,24,42,0.3)] transition-transform hover:-translate-y-0.5"
          >
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-200">Brochure PDF</p>
            <p className="m-0 text-lg font-bold text-sun">Product Brochure</p>
          </a>
          <a
            href="/assets/urc_robot_j%26k_V4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-sun/35 bg-gradient-to-br from-[#0f2a43] via-[#1b3550] to-[#1a3148] p-5 text-slate-100 shadow-[0_12px_34px_rgba(7,24,42,0.3)] transition-transform hover:-translate-y-0.5"
          >
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-200">Investor PDF</p>
            <p className="m-0 text-lg font-bold text-sun">Pitchdeck</p>
          </a>
        </div>
      </div>
    </section>
  );
}
