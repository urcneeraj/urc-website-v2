import Link from "next/link";

const CARD_BASE =
  "bg-white/[0.92] border border-black/[0.12] rounded-[18px] overflow-hidden shadow-[0_10px_30px_rgba(2,6,23,0.06)] transition-all duration-[220ms] hover:-translate-y-1.5 hover:shadow-[0_18px_60px_rgba(2,6,23,0.12)]";

const products = [
  {
    img: "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/Version_4_2026-Feb-21_04-25-36PM-000_CustomizedView51850991782.png",
    alt: "URC X40",
    badge: "Commercial Scrubber",
    name: "URC X40",
    desc: "High-capacity autonomous floor scrubber featuring advanced LiDAR, SLAM, and dynamic ODrive motor control.",
    href: "/x40",
    padImg: false,
  },
  {
    img: "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/service_bot.jpg",
    alt: "Service Bot",
    badge: "Delivery System",
    name: "Hospitality Bot",
    desc: "Compact delivery and service robot offering smooth navigation and dynamic tray balancing for tight spaces.",
    href: "/#contact",
    padImg: true,
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
          <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
            Featuring advanced tech and adaptive modes, our robots are the ultimate solution for all tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
          {products.map((p) => (
            <div key={p.name} className={CARD_BASE}>
              <div className={`h-[220px] bg-[#eef3f9] ${p.padImg ? "p-8" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.alt} className="w-full h-full object-cover" />
              </div>
              <div className="p-[18px_18px_22px]">
                <span className="inline-flex items-center px-3 py-2 rounded-full bg-accent/[0.12] text-accent font-extrabold text-[12px] uppercase tracking-[0.1em]">
                  {p.badge}
                </span>
                <h3 className="my-2.5 text-[1.25rem] tracking-[-0.01em] text-navy">{p.name}</h3>
                <p className="m-0 text-muted font-medium leading-[1.7] text-sm">{p.desc}</p>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2.5 font-extrabold text-navy mt-3 group"
                >
                  EXPLORE{" "}
                  <span className="text-accent transition-transform duration-[180ms] group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
