"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";

type Industry = {
  id: string;
  label: string;
  imageSrc: string | null;
  alt: string;
  caption?: { title: string; body: string };
};

const UNDERLINE_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const INDUSTRIES: Industry[] = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    imageSrc: "/assets/industry-manufacturing.png",
    alt: "URC autonomous floor scrubber in a modern manufacturing facility with machinery and workers",
    caption: {
      title: "Manufacturing",
      body: "Revolutionize productivity and safety standards with Sparkoz Autonomous Industrial Cleaning Robots",
    },
  },
  {
    id: "transportation",
    label: "Transportation",
    imageSrc: "/assets/industry-transportation.png",
    alt: "URC X40 autonomous floor scrubber in a bright airport terminal with gates and aircraft visible through windows",
    caption: {
      title: "Transportation",
      body: "Keep terminals, transit hubs, and high-traffic corridors spotless—autonomous cleaning that fits real schedules without disrupting passenger flow.",
    },
  },
  {
    id: "retail",
    label: "Retail",
    imageSrc: "/assets/industry-retail.png",
    alt: "URC X40 autonomous floor scrubber in a grocery store aisle with breakfast and snack shelves, aisle signage, and polished floors",
    caption: {
      title: "Retail",
      body: "Keep stores customer-ready—autonomous floor care that navigates aisles, peak hours, and daily traffic without slowing checkout or shopping flow.",
    },
  },
  {
    id: "education",
    label: "Education",
    imageSrc: null,
    alt: "",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    imageSrc: null,
    alt: "",
  },
  {
    id: "workspace",
    label: "Workspace",
    imageSrc: null,
    alt: "",
  },
];

export default function SuitableForIndustries() {
  const [activeId, setActiveId] = useState<string>("manufacturing");
  const baseId = useId();
  const active = INDUSTRIES.find((i) => i.id === activeId) ?? INDUSTRIES[0];

  const onSelect = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <section id="industries" className="bg-offwhite py-[84px]">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="m-0 mb-2.5 text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-navy md:text-[2.3rem]">
            Suitable For All Industries
          </h2>
          <p className="mx-auto m-0 max-w-[920px] text-base font-medium leading-[1.7] text-slate-950 md:text-lg">
            Our products are trusted by clients across various industries, testament to our commitment to excellence and
            reliability spanning a multitude of applications and scenarios.
          </p>
        </div>

        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-4 md:gap-x-6"
          role="tablist"
          aria-label="Industry focus"
        >
          {INDUSTRIES.map((ind) => {
            const selected = activeId === ind.id;
            return (
              <button
                key={ind.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${ind.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={0}
                onClick={() => onSelect(ind.id)}
                className={cn(
                  "relative px-0.5 pb-2 font-semibold transition-colors duration-300 ease-out",
                  "text-[13px] uppercase tracking-[0.12em] sm:text-sm",
                  selected ? "text-navy" : "text-slate-500 hover:text-navy/80",
                )}
              >
                <span className="relative z-10">{ind.label}</span>
                {/* Smooth scale-based underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 h-[3px] w-full max-w-full -translate-x-1/2 rounded-full bg-accent",
                    "origin-center will-change-transform",
                    selected ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                  )}
                  style={{
                    transition: `transform 380ms ${UNDERLINE_EASE}, opacity 280ms ease-out`,
                  }}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className="overflow-hidden rounded-xl border border-black/[0.08] bg-gradient-to-b from-slate-200/90 via-slate-100 to-slate-200/80 shadow-[0_12px_40px_rgba(19,42,65,0.12)] ring-1 ring-inset ring-black/5"
        >
          <div className="relative aspect-[16/9] w-full md:aspect-[2/1] lg:aspect-[21/9]">
            {active.imageSrc ? (
              <Image
                key={active.id}
                src={active.imageSrc}
                alt={active.alt}
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover object-center"
                priority={activeId === "manufacturing"}
              />
            ) : (
              <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-1 bg-gradient-to-b from-slate-200/95 to-slate-100 px-6 text-center">
                <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {active.label}
                </p>
                <p className="m-0 text-sm font-medium text-slate-600">Image coming soon</p>
              </div>
            )}
          </div>
          {active.caption ? (
            <div className="border-t border-black/[0.08] bg-white/[0.92] px-5 py-5 sm:px-8 sm:py-6">
              <h3 className="m-0 mb-2 text-left text-[1.15rem] font-semibold tracking-[-0.02em] text-navy md:text-[1.25rem]">
                {active.caption.title}
              </h3>
              <p className="m-0 max-w-[920px] text-left text-sm font-medium leading-[1.75] text-slate-600 md:text-[15px]">
                {active.caption.body}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
