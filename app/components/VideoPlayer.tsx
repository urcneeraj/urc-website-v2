"use client";

import { useState } from "react";

export default function VideoPlayer() {
  const [videoError, setVideoError] = useState(false);

  if (videoError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-midnight p-6 text-center">
        <p className="text-sm font-semibold text-slate-200">Video format is not supported by this browser.</p>
        <p className="max-w-[520px] text-xs text-slate-400">
          The file appears to be encoded with a codec your browser cannot decode. Re-export the video as H.264 (AVC)
          + AAC MP4 for universal playback.
        </p>
        <a
          href="/assets/Version-4.mp4"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gradient-to-br from-accent to-sun px-4 py-2 text-xs font-bold text-navy"
        >
          Open Video Directly
        </a>
      </div>
    );
  }

  return (
    <video
      className="w-full h-full object-cover block"
      poster="/assets/Version_4_2026-Feb-21_04-23-21PM-000_CustomizedView23273657020.png"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls
      onCanPlay={(event) => {
        const video = event.currentTarget;
        void video.play().catch(() => {});
      }}
      onLoadedData={(event) => {
        const video = event.currentTarget;
        void video.play().catch(() => {});
      }}
      onError={() => setVideoError(true)}
    >
      <source src="/assets/Version-4.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
    </video>
  );
}
