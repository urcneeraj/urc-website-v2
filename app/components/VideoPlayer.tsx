"use client";

import { useState, useEffect, useRef } from "react";
import { servingInActionVideoSources } from "../lib/servingVideo";

const POSTER = "/assets/serving-bot-1.png";

/**
 * Loads the MP4 only when the block is near the viewport — avoids competing with hero/LCP on first load.
 */
export default function VideoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const sources = servingInActionVideoSources();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setLoadVideo(true);
      },
      { rootMargin: "180px", threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (videoError) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 z-[1] flex h-full w-full flex-col items-center justify-center gap-2 bg-midnight p-6 text-center"
      >
        <p className="text-sm font-semibold text-slate-200">Video could not play in this browser.</p>
        <p className="max-w-[520px] text-xs text-slate-400">
          Ensure H.264 + AAC MP4 files exist under <code className="text-sun">public/assets/</code> (e.g.
          serving-in-action.mp4).
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!loadVideo ? (
        <div
          className="absolute inset-0 bg-midnight bg-cover bg-center"
          style={{ backgroundImage: `url('${POSTER}')` }}
          aria-hidden
        />
      ) : (
        <video
          className="absolute inset-0 z-0 h-full w-full max-h-full object-cover"
          poster={POSTER}
          suppressHydrationWarning
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls
          disablePictureInPicture
          onCanPlay={(event) => {
            void event.currentTarget.play().catch(() => {});
          }}
          onError={() => setVideoError(true)}
        >
          {sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      )}
    </div>
  );
}
