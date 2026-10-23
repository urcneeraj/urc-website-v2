"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy-loaded — keeps the video element out of the initial JS bundle
const VideoPlayer = lazy(() => import("./VideoPlayer"));

function VideoSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-midnight">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}

export default function VideoSection() {
  return (
    <motion.section
      id="in-action"
      className="bg-midnight py-12 md:py-16 lg:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 lg:px-12">

        {/* Section heading */}
        <div className="text-center mb-11">
          <h2 className="text-3xl md:text-5xl lg:text-7xl leading-[1.08] tracking-[-0.03em] m-0 mb-2.5 text-slate-100">
            Serving Robot in Action
          </h2>
          <p className="mx-auto max-w-[720px] text-slate-300 font-mono font-medium leading-[1.7] m-0 text-sm">
            Field footage of the hospitality serving platform — consistent tray runs with minimal supervision.
          </p>
        </div>

      </div>

      {/* Full-bleed video (no outer box) */}
      <div className="relative left-1/2 right-1/2 mt-8 w-screen -translate-x-1/2 bg-midnight md:mt-10">
        <div className="relative aspect-video w-full overflow-hidden bg-midnight">
          <Suspense fallback={<VideoSkeleton />}>
            <VideoPlayer />
          </Suspense>
        </div>
      </div>
    </motion.section>
  );
}
