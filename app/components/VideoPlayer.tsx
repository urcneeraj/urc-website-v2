"use client";

export default function VideoPlayer() {
  return (
    <video
      className="w-full h-full object-cover block"
      src="/assets/x40-demo.mp4"
      poster="/assets/x40-spec-sheet.png"
      autoPlay
      muted
      loop
      playsInline
      controls
    />
  );
}
