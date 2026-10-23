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
          <p className="mx-auto max-w-none md:max-w-[900px] text-slate-300 font-semibold leading-[1.7] m-0 text-base md:text-lg">
            Engineered in-house for affordable automation, scalable deployment, and measurable ROI.
          </p>
        </div>
      </div>

      {/* Full-bleed investor cards row */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <div className="mt-11 grid grid-cols-1 divide-y divide-black/[0.10] md:grid-cols-3 md:divide-y-0 md:divide-x">
          {cards.map((c) => (
            <div
              key={c.title}
              className="bg-white/[0.92] p-[26px_20px] md:p-[30px_26px] lg:p-[34px_34px]"
            >
              <div className="h-[220px] bg-offwhite md:h-[240px] lg:h-[260px] xl:h-[300px]">
                <Image
                  src={c.image}
                  alt={c.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`h-full w-full ${c.fit === "contain" ? "object-contain p-3" : "object-cover"}`}
                />
              </div>
              <h3 className="mt-4 mb-2.5 text-[1.2rem] tracking-[-0.01em] text-navy lg:text-[1.35rem]">{c.title}</h3>
              <p className="text-slate-500 font-medium leading-[1.7] m-0 mb-3.5 text-sm lg:text-[15px]">{c.desc}</p>
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
