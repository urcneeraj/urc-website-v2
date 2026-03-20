const steps = [
  {
    badge: "Step 1",
    title: "Pilot testing (Hospitality)",
    desc: "Service bots tested in hospitality operations.",
  },
  {
    badge: "Step 2",
    title: "Prototype completed",
    desc: "Navigation + LiDAR integrated for autonomous behavior.",
  },
  {
    badge: "Step 3",
    title: "Launch first 2 models",
    desc: "Initial roll-out planned after integration readiness.",
  },
  {
    badge: "Step 4",
    title: "Scale internationally",
    desc: "Pan-India expansion first, then global export markets.",
  },
];

export default function Traction() {
  return (
    <section id="traction" className="py-[84px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            Traction &amp; Scale Roadmap
          </h2>
          <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
            From prototype to expansion - ready for multi-market deployment.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div
              key={s.badge}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-[22px_18px] shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              <span className="inline-flex items-center justify-center h-7 px-2.5 rounded-full bg-accent/[0.12] text-accent font-black text-[12px] uppercase tracking-[0.06em]">
                {s.badge}
              </span>
              <div className="mt-3 font-black leading-[1.25] text-navy">{s.title}</div>
              <div className="mt-2 text-muted font-medium leading-[1.7] text-sm">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-9">
          <a
            href="mailto:urcrobotics@gmail.com?subject=Investor%20Briefing%20Request"
            className="inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-6 py-3.5 text-[15px] border border-transparent bg-gradient-to-br from-accent to-[#0ea5e9] text-white shadow-[0_18px_50px_rgba(0,179,166,0.18)] transition-transform hover:-translate-y-px"
          >
            Request Investor Briefing
          </a>
          <p className="text-muted font-semibold mt-3.5 mb-0">
            We will share the full pitch deck and deployment roadmap.
          </p>
        </div>
      </div>
    </section>
  );
}
