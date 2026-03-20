"use client";

import { Suspense, lazy } from "react";

// Lazy-load the video element — keeps it out of the initial JS bundle
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
    <section id="in-action" className="py-[84px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            Serving Robot in Action
          </h2>
          <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
            A real-world demo that shows consistent floor cleaning with minimal supervision.
          </p>
        </div>

        <div className="max-w-[980px] mx-auto mt-11 bg-white/[0.92] border border-black/[0.12] rounded-[18px] shadow-[0_10px_30px_rgba(2,6,23,0.06)] overflow-hidden">
          <div className="w-full aspect-video bg-midnight">
            <Suspense fallback={<VideoSkeleton />}>
              <VideoPlayer />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
