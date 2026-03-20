const LOGO =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/URC%20(1).png";

const cards = [
  {
    title: "Full Clean Automation",
    desc: "Vacuum, scrub and recover in one cleaning cycle - built to handle commercial hygiene demands.",
    items: [
      "Deep scrubbing performance with 550 mm cleaning width",
      "Extended runs via 40 L fresh + 45 L recovery tanks",
      "Dual-disc brush system for consistent results",
    ],
  },
  {
    title: "24X7 Remote Service Guidance",
    desc: "Factory-direct support that keeps robots running - reducing downtime for international deployments.",
    items: [
      "Remote troubleshooting and guidance",
      "Service-ready design for easier repairs",
      "Customer success through the robot lifetime",
    ],
  },
  {
    title: "ROI That Pays Back",
    desc: "Robots replace 3-5 human cleaners and can reach ROI in roughly 6-8 months.",
    items: [
      "Low-cost, durable, simple UI for teams",
      "Robust for Indian conditions + scalable operations",
      "Affordable pricing & easy renting",
    ],
  },
];

export default function InvestorSection() {
  return (
    <section id="investors" className="py-[84px]">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            Investor-Ready Value Proposition
          </h2>
          <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
            Engineered in-house for affordable automation, scalable deployment, and measurable ROI.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-[24px_22px] shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              {/* Logo badge */}
              <div className="w-[52px] h-[52px] rounded-[16px] bg-navy/[0.92] flex items-center justify-center overflow-hidden" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LOGO} alt="" className="w-[70%] h-auto brightness-0 invert" />
              </div>
              <h3 className="mt-3 mb-2.5 text-[1.2rem] tracking-[-0.01em] text-navy">{c.title}</h3>
              <p className="text-muted font-medium leading-[1.7] m-0 mb-3.5 text-sm">{c.desc}</p>
              <ul className="list-none p-0 m-0">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-[22px] text-muted font-semibold leading-[1.6] my-2.5 text-[14px]"
                  >
                    <span className="absolute left-0 top-0 font-black text-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
