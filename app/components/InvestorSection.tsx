import Image from "next/image";

const cards = [
  {
    image: "/assets/Version_4_2026-Feb-25_09-46-42AM-000_CustomizedView46779907477.png",
    fit: "contain",
    title: "Full Clean Automation",
    desc: "Vacuum, scrub and recover in one cleaning cycle - built to handle commercial hygiene demands.",
    items: [
      "Deep scrubbing performance with 550 mm cleaning width",
      "Extended runs via 40 L fresh + 45 L recovery tanks",
      "Dual-disc brush system for consistent results",
    ],
  },
  {
    image: "/assets/Version_4_2026-Feb-21_06-23-11PM-000_CustomizedView27146563509.png",
    fit: "cover",
    title: "24X7 Remote Service Guidance",
    desc: "Factory-direct support that keeps robots running - reducing downtime for international deployments.",
    items: [
      "Remote troubleshooting and guidance",
      "Service-ready design for easier repairs",
      "Customer success through the robot lifetime",
    ],
  },
  {
    image: "/assets/Version_4_2026-Feb-21_02-33-14PM-000_CustomizedView15451423060.png",
    fit: "cover",
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
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-slate-100 drop-shadow-[0_2px_12px_rgba(2,6,23,0.35)]">
            Investor-Ready Value Proposition
          </h2>
          <p className="mx-auto max-w-[760px] text-slate-300 font-semibold leading-[1.7] m-0">
            Engineered in-house for affordable automation, scalable deployment, and measurable ROI.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-[24px_22px] shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              <div className="h-[170px] overflow-hidden rounded-[14px] border border-navy/10 bg-offwhite">
                <Image
                  src={c.image}
                  alt={c.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`h-full w-full ${c.fit === "contain" ? "object-contain p-3" : "object-cover"}`}
                />
              </div>
              <h3 className="mt-3 mb-2.5 text-[1.2rem] tracking-[-0.01em] text-navy">{c.title}</h3>
              <p className="text-slate-500 font-medium leading-[1.7] m-0 mb-3.5 text-sm">{c.desc}</p>
              <ul className="list-none p-0 m-0">
                {c.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-[22px] text-slate-500 font-semibold leading-[1.6] my-2.5 text-[14px]"
                  >
                    <span className="absolute left-0 top-0 font-black text-navy">✓</span>
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
