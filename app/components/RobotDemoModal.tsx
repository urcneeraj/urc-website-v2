"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VIDEO_SRC = "/assets/robot-demo.mov";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Portrait / phone footage (9:16): frame height capped at ~85dvh, width = height × 9/16 (capped for small screens).
 */
export default function RobotDemoModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="robot-demo-layer"
          className="fixed inset-0 z-[2100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="robot-demo-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/72 backdrop-blur-[2px]"
            aria-label="Close video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 flex w-full flex-col items-center"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
          >
            <h2 id="robot-demo-title" className="sr-only">
              Robot demo video
            </h2>
            <div
              className="relative mx-auto overflow-hidden rounded-[22px] bg-black shadow-[0_24px_80px_rgba(2,6,23,0.45),0_4px_20px_rgba(239,8,6,0.14)] ring-1 ring-accent/25"
              style={{
                height: "min(85dvh, 820px)",
                width: "min(92vw, 440px, calc(min(85dvh, 820px) * 9 / 16))",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 z-20 rounded-full border border-white/35 bg-navy/90 px-3 py-1.5 text-xs font-bold text-slate-100 shadow-md hover:bg-navy sm:right-3 sm:top-3 sm:px-3.5 sm:text-sm"
              >
                Close
              </button>
              <video
                key={open ? "on" : "off"}
                className="absolute inset-0 h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                autoPlay
              >
                <source src={VIDEO_SRC} type="video/quicktime" />
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 max-w-[min(92vw,440px)] text-center font-mono text-[11px] leading-snug text-slate-500 sm:text-xs">
              Portrait (9:16) demo — frame scales with screen height. If playback fails, try Safari or H.264 MP4.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
