import Link from "next/link";
import Image from "next/image";

const CARD_BASE =
  "bg-white/[0.92]";

const products = [
  {
    img: "/assets/x40-unmatched-cleaning-card.png",
    alt: "URC X40 autonomous floor scrubber with URC and X40 branding in a modern warehouse with charging station and shelving",
    badge: "Commercial Scrubber",
    name: "URC X40",
    desc: "High-capacity autonomous floor scrubber featuring advanced LiDAR, SLAM, and dynamic ODrive motor control.",
    href: "/x40",
  },
  {
    img: "/assets/Version_4_2026-Feb-21_06-23-11PM-000_CustomizedView27146563509.png",
    alt: "Service Bot",
    badge: "Delivery System",
    name: "Hospitality Bot",
    desc: "Compact delivery and service robot offering smooth navigation and dynamic tray balancing for tight spaces.",
    href: "/#contact",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-[84px] bg-offwhite">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-[42px]">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            Unmatched Cleaning Power
          </h2>
          <p className="mx-auto max-w-none md:max-w-[860px] m-0 text-base md:text-lg font-medium leading-[1.7] text-slate-950">
            Featuring advanced tech and adaptive modes, our robots are the ultimate solution for all tasks.
          </p>
        </div>

      </div>

      {/* Full-bleed product cards row */}
      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-black/[0.10] md:divide-y-0 md:divide-x">
          {products.map((p) => (
            <div key={p.name} className={CARD_BASE}>
              {/* Darker media well + full-bleed cover so the strip reads clearly against the white card */}
              <div className="relative h-[240px] w-full overflow-hidden border-b border-black/[0.08] bg-gradient-to-b from-[#94a3b8] via-[#cbd5e1] to-[#e2e8f0] ring-1 ring-inset ring-black/10 md:h-[300px] lg:h-[360px] xl:h-[420px]">
                <Image
                  src={p.img}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority={p.name === "URC X40"}
                />
              </div>
              <div className="p-[22px_18px_26px] md:p-[28px_26px_32px] lg:p-[34px_34px_38px]">
                <span className="inline-flex items-center font-extrabold text-[12px] uppercase tracking-[0.1em] text-black">
                  {p.badge}
                </span>
                <h3 className="my-2.5 text-[1.25rem] tracking-[-0.01em] text-navy md:text-[1.4rem] lg:text-[1.55rem]">{p.name}</h3>
                <p className="m-0 text-slate-500 font-medium leading-[1.7] text-sm md:text-[15px] lg:text-base">{p.desc}</p>
                <p className="mt-4 m-0 text-sm leading-none">
                  <Link
                    href={p.href}
                    className="inline-block font-extrabold text-navy underline decoration-transparent underline-offset-[5px] transition-[color,text-decoration-color,transform] duration-200 hover:-translate-y-px hover:text-navy hover:decoration-navy"
                  >
                    EXPLORE
                  </Link>
                  <span className="ml-1.5 font-extrabold text-slate-400 select-none" aria-hidden>
                    →
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
