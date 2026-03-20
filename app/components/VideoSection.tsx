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
            <video
              className="w-full h-full object-cover block"
              src="/assets/x40-demo.mp4"
              poster="/assets/x40-spec-sheet.png"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
