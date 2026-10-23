"use client";

import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";

const SHOWCASE_IMAGE = "/assets/x40-studio-side-swow6d.png";

export type HotspotItem = {
  id: number;
  top: string;
  left: string;
  title: string;
  description: string;
  tooltipSide?: "left" | "right";
};

/** Percent of the left hotspot column — edit freely to align pulses with the photo. */
const HOTSPOTS: HotspotItem[] = [
  {
    id: 1,
    top: "24%",
    left: "38%",
    title: "Ergonomic manual assist",
    description: "Polished handle and rear interface for quick overrides and docking.",
    tooltipSide: "right",
  },
  {
    id: 2,
    top: "40%",
    left: "26%",
    title: "URC X40 designation",
    description: "Industrial side panel with model marking and service access.",
    tooltipSide: "right",
  },
  {
    id: 3,
    top: "58%",
    left: "44%",
    title: "Dual-disc scrub deck",
    description: "Illuminated brushes and balanced downforce for consistent finish quality.",
    tooltipSide: "left",
  },
];

function HotspotDot({
  hotspot,
  labelledBy,
  openHotspotId,
  setOpenHotspotId,
}: {
  hotspot: HotspotItem;
  labelledBy: string;
  openHotspotId: number | null;
  setOpenHotspotId: (id: number | null) => void;
}) {
  const open = openHotspotId === hotspot.id;
  const anyOpen = openHotspotId !== null;
  const side = hotspot.tooltipSide ?? "right";

  const show = useCallback(() => setOpenHotspotId(hotspot.id), [hotspot.id, setOpenHotspotId]);
  const hide = useCallback(() => setOpenHotspotId(null), [setOpenHotspotId]);
  const toggle = useCallback(() => {
    setOpenHotspotId(open ? null : hotspot.id);
  }, [open, hotspot.id, setOpenHotspotId]);

  return (
    <div
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 transition-[z-index] duration-150",
        open && "z-[200]",
        !open && anyOpen && "z-[15]",
        !anyOpen && "z-30",
      )}
      style={{ top: hotspot.top, left: hotspot.left }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={labelledBy}
        className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full outline-none ring-sky-400/50 focus-visible:ring-2"
        onClick={toggle}
        onFocus={show}
        onBlur={hide}
      >
        <span className="absolute inline-flex h-8 w-8 rounded-full bg-sky-400/35 animate-ping" aria-hidden />
        <span
          className="relative h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.95)] ring-2 ring-sky-200/40"
          aria-hidden
        />
      </button>

      <div
        id={labelledBy}
        role="tooltip"
        className={cn(
          "absolute top-1/2 w-[min(240px,calc(100vw-2rem))] -translate-y-1/2 rounded-xl border border-white/15 bg-black/80 px-3.5 py-3 text-left shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-[12px] transition-opacity duration-200 ease-out",
          open ? "pointer-events-auto z-[220] opacity-100" : "pointer-events-none z-[210] opacity-0",
          side === "right" && "left-full ml-3",
          side === "left" && "right-full mr-3",
        )}
      >
        <p className="text-[13px] font-semibold tracking-tight text-white">{hotspot.title}</p>
        <p className="mt-1 text-[12px] leading-snug text-slate-300/95">{hotspot.description}</p>
      </div>
    </div>
  );
}

export default function X40HotspotShowcase() {
  const baseId = useId();
  const [openHotspotId, setOpenHotspotId] = useState<number | null>(null);

  return (
    <section className="relative isolate min-h-[100dvh] w-full overflow-hidden">
      {/* Full-screen background: same image edge-to-edge (incl. behind copy column) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHOWCASE_IMAGE}
          alt=""
          className="h-full w-full object-cover object-[20%_center] sm:object-left lg:object-[15%_center]"
          aria-hidden
        />
        {/* Light veil on the right so headline + buttons stay readable on the photo */}
        <div
          className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/35 to-transparent sm:from-black/70 sm:via-black/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1600px] flex-col lg:flex-row">
        {/* Left: hotspot layer (coordinates are % of this column = ~where the machine sits) */}
        <div className="relative min-h-[min(52vh,520px)] w-full flex-[1.05] lg:min-h-0 lg:max-w-none">
          {HOTSPOTS.map((h) => (
            <HotspotDot
              key={h.id}
              hotspot={h}
              labelledBy={`${baseId}-tip-${h.id}`}
              openHotspotId={openHotspotId}
              setOpenHotspotId={setOpenHotspotId}
            />
          ))}
        </div>

        {/* Copy block: same column/position as before; left-aligned type (title + body + buttons) */}
        <div className="flex w-full flex-[0.95] flex-col justify-center px-5 pb-16 pt-10 text-left sm:px-8 lg:max-w-[min(520px,44vw)] lg:flex-none lg:items-start lg:justify-center lg:px-10 lg:pb-24 lg:pt-24">
          <p className="mb-3 max-w-xl font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] md:text-xs">
            Autonomous floor cleaning robot
          </p>
          <h2 className="mb-5 max-w-xl text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] md:text-4xl lg:text-[2.65rem]">
            URC X40
          </h2>
          <p className="mb-8 max-w-xl font-sans text-sm leading-relaxed text-zinc-100/95 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] md:text-base">
            Featuring advanced tech and unmatched cleaning power, the X40 is the ultimate solution for all cleaning tasks.
          </p>
          <div className="flex flex-wrap justify-start gap-3">
            <button
              type="button"
              className="rounded-full border border-white/25 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:border-sky-400/50 hover:bg-sky-500/20"
            >
              Disc Brush
            </button>
            <button
              type="button"
              className="rounded-full border border-white/25 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:border-sky-400/50 hover:bg-sky-500/20"
            >
              Cylindrical Brush
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
