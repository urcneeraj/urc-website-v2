"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const gallery = [
  { src: "/assets/serving-bot-1.png", alt: "Serving robot front angle" },
  { src: "/assets/serving-bot-2.png", alt: "Serving robot side view" },
  { src: "/assets/serving-bot-3.png", alt: "Serving robot premium render" },
];

export default function ServingRobotSection() {
  const hoverTimerRef = useRef<number | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);

  function handlePreviewStart(image: { src: string; alt: string }) {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => {
      setPreviewImage(image);
    }, 1000);
  }

  function handlePreviewEnd() {
    if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
    setPreviewImage(null);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-16 md:py-20 lg:py-24"
      id="autonomous-serving-robot"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-9 text-center">
          <h2 className="m-0 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-slate-100 md:text-5xl lg:text-6xl">
            Autonomous Serving Robot
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] font-mono text-sm leading-[1.8] text-slate-300 md:text-base">
            A hospitality-focused autonomous platform with smooth navigation, modern industrial design,
            and dependable real-world service performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[22px] border border-slate-200/10 bg-slate-900/40 shadow-[0_20px_60px_rgba(2,6,23,0.45)]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/serving-bot-1.png"
              controls
            >
              <source src="/assets/Serving-bot-360.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
              <source src="/assets/Serving-bot-360.mp4" type="video/mp4" />
              <source src="/assets/Serving_bot%20360.avi" type="video/x-msvideo" />
            </video>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((item, idx) => (
              <div
                key={item.src}
                className={`group relative overflow-hidden rounded-[18px] border border-slate-200/10 bg-slate-900/30 shadow-[0_12px_28px_rgba(2,6,23,0.22)] ${
                  idx === 0 ? "sm:col-span-2" : ""
                }`}
                onMouseEnter={() => handlePreviewStart(item)}
                onMouseLeave={handlePreviewEnd}
              >
                <div className="relative h-full min-h-[240px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                    loading="eager"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {previewImage ? (
        <div className="pointer-events-none fixed inset-0 z-[1200] grid place-items-center bg-black/55 p-4">
          <div className="relative h-[min(72vh,760px)] w-[min(92vw,1200px)] overflow-hidden rounded-2xl border border-white/20 bg-slate-900/70 shadow-[0_30px_80px_rgba(2,6,23,0.55)]">
            <Image
              src={previewImage.src}
              alt={previewImage.alt}
              fill
              sizes="92vw"
              priority
              loading="eager"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </motion.section>
  );
}
