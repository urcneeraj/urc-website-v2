"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy-loaded — keeps the video element out of the initial JS bundle
const VideoPlayer = lazy(() => import("./VideoPlayer"));

function VideoSkeleton() {
  return (
    <div className="w-full h-full bg-midnight flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
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
            Cleaning Robot in Action
          </h2>
          {/* text-slate-300 for contrast fix; font-mono matches the site's technical aesthetic */}
          <p className="mx-auto max-w-[720px] text-slate-300 font-mono font-medium leading-[1.7] m-0 text-sm">
            A real-world demo that shows consistent floor cleaning with minimal supervision.
          </p>
        </div>

        {/*
          Video card — dark navy background so the footage pops,
          generous rounded corners, layered shadow + a subtle teal ring
          give it the same premium card language used across the site.
        */}
        <div className="max-w-[980px] mx-auto mt-8 md:mt-10 rounded-[22px] overflow-hidden
                        shadow-[0_24px_80px_rgba(2,6,23,0.18),0_4px_20px_rgba(239,8,6,0.16)]
                        ring-1 ring-accent/[0.15]">
          <div className="w-full aspect-video bg-midnight">
            <Suspense fallback={<VideoSkeleton />}>
              <VideoPlayer />
            </Suspense>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
