const features = [
  {
    icon: "🧭",
    title: "AI Navigation Algorithms",
    items: [
      "Advanced SLAM localization",
      "Dynamic path planning",
      "Real-time obstacle perception",
    ],
  },
  {
    icon: "⚙️",
    title: "Innovative Hardware",
    items: [
      "High-efficiency ODrive systems",
      "24V 65Ah Deep Cycle Lead Acid battery",
      "Adaptive brush pressure",
    ],
  },
  {
    icon: "☁️",
    title: "Cloud-Based Management",
    items: [
      "User-friendly fleet dashboard",
      "Visualized heatmap reports",
      "Real-time robot monitoring",
    ],
  },
];

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-[22px] text-muted font-medium leading-[1.6] my-2.5 text-sm">
      <span className="absolute left-0 top-0 font-black text-accent">✓</span>
      {children}
    </li>
  );
}

export default function Features() {
  return (
    <section id="technology" className="py-[84px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            Core Technology
          </h2>
          <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
            Self-developed algorithms and innovative hardware designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-6 shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              <div className="w-[52px] h-[52px] rounded-[16px] bg-accent/[0.12] text-accent flex items-center justify-center text-[22px] mb-3.5">
                {f.icon}
              </div>
              <h4 className="m-0 mb-3 text-[1.1rem] tracking-[-0.01em] text-navy font-bold">
                {f.title}
              </h4>
              <ul className="p-0 m-0 list-none">
                {f.items.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
