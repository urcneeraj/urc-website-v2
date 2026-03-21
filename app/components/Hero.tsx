"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ExpandingButton from "./ExpandingButton";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const metrics = [
  { label: "Fleet Coverage", value: "97.6%" },
  { label: "Runtime", value: "6-8 Hrs" },
  { label: "LiDAR + Nav2", value: "Online" },
  { label: "Active Units", value: "24/7" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const tableRotateX = useMotionValue(0);
  const tableRotateY = useMotionValue(0);
  const springRotateX = useSpring(tableRotateX, { stiffness: 120, damping: 18, mass: 0.6 });
  const springRotateY = useSpring(tableRotateY, { stiffness: 120, damping: 18, mass: 0.6 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current;
    if (!video) return;
    const attemptPlay = async () => {
      try {
        await video.play();
      } catch {
        // Some browsers delay autoplay until enough data is buffered.
      }
    };
    void attemptPlay();
  }, [mounted]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const host = heroRef.current;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      tableRotateY.set(px * 10);
      tableRotateX.set(-py * 7);
    };

    const onLeave = () => {
      tableRotateX.set(0);
      tableRotateY.set(0);
    };

    const host = heroRef.current;
    if (!host) return;
    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    return () => {
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, [tableRotateX, tableRotateY]);

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden pt-[88px] md:pt-[92px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Cinematic background video (mounted client-side to avoid hydration class mismatch) */}
      {mounted && !videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/serving-bot-demo.mp4"
          poster="/assets/Version_4_2026-Feb-21_04-23-21PM-000_CustomizedView23273657020.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          suppressHydrationWarning
          onError={() => setVideoError(true)}
        />
      ) : (
        <div
          className="absolute inset-0 bg-midnight bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/Version_4_2026-Feb-21_04-23-21PM-000_CustomizedView23273657020.png')" }}
        />
      )}

      {/* Contrast overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,11,20,0.9)_8%,rgba(7,24,42,0.78)_44%,rgba(7,24,42,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(59,130,246,0.24),transparent_48%)]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-[1180px] grid-cols-1 items-center gap-8 px-4 pb-12 md:min-h-[calc(100vh-92px)] md:gap-10 md:px-6 lg:gap-12 lg:pb-16 lg:px-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-[640px]"
        >
          <p className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-300">
            URC X40 Platform
          </p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.98, backgroundPosition: "0% 50%" }}
            animate={{ opacity: 1, scale: 1, backgroundPosition: "100% 50%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ backgroundSize: "200% 200%" }}
            className="mb-5 bg-gradient-to-r from-blue-300 via-slate-100 to-cyan-300 bg-clip-text text-3xl font-bold leading-[1.03] tracking-[-0.03em] text-transparent md:text-5xl lg:text-7xl"
          >
            Robotics for Autonomous Cleaning
          </motion.h1>
          <p className="mb-8 max-w-[560px] font-mono text-xs leading-[1.9] text-slate-300 sm:text-sm md:text-[15px]">
            Autonomous cleaning intelligence for high-traffic commercial spaces, with live telemetry, adaptive
            navigation, and industrial-grade reliability designed for all-day deployment.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <ExpandingButton
              href="/x40"
              text="Explore X40"
              color="bg-gradient-to-br from-accent to-sun"
              className="px-5 py-3 text-sm font-bold text-navy md:px-6 md:py-3.5 md:text-[15px]"
            />
            <ExpandingButton
              href="/#in-action"
              text="Watch In Action"
              color="bg-slate-900"
              className="border border-slate-200/50 px-5 py-3 text-sm font-semibold text-slate-100 md:px-6 md:py-3.5 md:text-[15px]"
            />
          </div>
        </motion.div>

        {/* Dashboard overlays */}
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1200 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.18 + i * 0.08 }}
              className="rounded-2xl border border-white/15 bg-slate-900/45 p-4 shadow-[0_12px_30px_rgba(2,6,23,0.3)] backdrop-blur-md"
            >
              <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-300">{m.label}</p>
              <p className="text-[22px] font-bold text-slate-100">{m.value}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.52 }}
            className="sm:col-span-2 rounded-2xl border border-accent/35 bg-midnight/70 p-4 shadow-[0_20px_40px_rgba(2,6,23,0.35)]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-300">Live Ops Insight</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              Grid path execution, obstacle recovery, and battery state are streamed in real-time for operator-grade
              monitoring and audit-ready reporting.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
