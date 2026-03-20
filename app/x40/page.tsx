import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "URC X40 | Product Details",
  description:
    "Technical specifications, navigation details, and full product overview of the URC X40 Autonomous Floor Scrubber.",
};

const ROBOT_IMG =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/Version_4_2026-Feb-21_04-25-36PM-000_CustomizedView51850991782.png";
const NAV_IMG =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/Version_4_2026-Feb-21_01-59-46PM-000_CustomizedView54592678928.png";
const LOGO =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/URC%20(1).png";

const specs = [
  { label: "Dimension (L x W x H)", value: "1150 x 800 x 770 mm" },
  { label: "Weight",                 value: "120 kg" },
  { label: "Cleaning Width",         value: "550 mm" },
  { label: "Suction Width",          value: "800 mm" },
  { label: "Fresh Water Tank",       value: "40 L" },
  { label: "Recovery Tank",          value: "45 L" },
  { label: "Suction Motor",          value: "500 W" },
  { label: "Brush Motor",            value: "150 W x 2" },
  { label: "Brush Speed",            value: "200 RPM" },
  { label: "Battery",                value: "24 V 65Ah Deep Cycle Lead Acid" },
  { label: "Working Time",           value: "6-8 Hours" },
  { label: "Navigation System",      value: "LiDAR SLAM (ROS Based)" },
  { label: "Noise Level",            value: "75-80 dB" },
  { label: "Climbing Ability",       value: "~6%" },
  { label: "Maximum Speed",          value: "~1.2 m/s" },
];

export default function X40Page() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-[1000] py-3.5 bg-white/[0.92] shadow-[0_10px_40px_rgba(2,6,23,0.08)] backdrop-blur-[10px]">
        <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="URC Robotics Home"
            className="inline-flex items-center px-3 py-1.5 bg-white/[0.95] border border-black/[0.12] rounded-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="URC Robotics" className="h-10 w-auto" />
          </Link>
          <ul className="hidden sm:flex flex-1 items-center justify-center gap-6 list-none p-0 m-0">
            <li>
              <Link href="/" className="font-semibold text-[14px] text-navy/95 hover:text-accent transition-colors">
                ← Back to Home
              </Link>
            </li>
          </ul>
          <a
            href="https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/v5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="URC_X40_Brochure.pdf"
            className="inline-flex items-center justify-center font-bold rounded-full px-[18px] py-3 text-sm border border-accent/55 text-accent hover:bg-accent/[0.08] transition-colors"
          >
            Download PDF
          </a>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="py-[84px] bg-offwhite pt-[104px]">
          <div className="max-w-[1180px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-[46px]">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center px-3 py-2 rounded-full bg-accent/[0.12] text-accent font-extrabold text-[12px] uppercase tracking-[0.1em]">
                Flagship Model
              </span>
              <h1 className="text-[3rem] leading-[1.05] tracking-[-0.03em] mt-3 mb-3.5 text-navy">
                URC X40 Autonomous Scrubber
              </h1>
              <p className="text-muted font-medium text-base leading-[1.7] mb-5 max-w-[560px] m-0">
                Engineered for absolute reliability, the X40 utilizes industrial-grade hardware and a
                custom ROS&nbsp;2 technology stack to deliver pristine floors with zero supervision.
              </p>
              <a
                href="mailto:urcrobotics@gmail.com"
                className="inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-6 py-3.5 text-[15px] border border-transparent bg-gradient-to-br from-accent to-[#0ea5e9] text-white shadow-[0_18px_50px_rgba(0,179,166,0.18)] transition-transform hover:-translate-y-px mt-5"
              >
                Contact Sales
              </a>
            </div>
            <div className="shrink-0 w-full lg:w-[460px] lg:max-w-[520px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ROBOT_IMG}
                alt="URC X40"
                className="w-full rounded-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] max-h-[64vh] object-contain"
              />
            </div>
          </div>
        </section>

        {/* Specifications table */}
        <section id="specs" className="py-[84px]">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-11">
              <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
                Technical Specifications
              </h2>
              <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
                Built to handle the demands of massive commercial facilities.
              </p>
            </div>

            <div className="max-w-[800px] mx-auto bg-white border border-[#e2e8f0] rounded-lg overflow-hidden">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {specs.map((s, i) => (
                    <tr
                      key={s.label}
                      className={`border-b border-[#e2e8f0] ${i % 2 === 0 ? "bg-[#f8f9fa]" : "bg-white"}`}
                    >
                      <th className="px-6 py-4 font-semibold w-[40%] text-navy text-sm">{s.label}</th>
                      <td className="px-6 py-4 text-[#555] text-sm">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Navigation details */}
        <section id="navigation" className="py-[84px] bg-offwhite">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-[34px] items-start justify-between">
              <div className="flex-1">
                <h2 className="text-[2rem] mb-4 text-navy">Precision ROS 2 Navigation</h2>
                <p className="text-[#555] mb-4 leading-[1.7] text-sm">
                  The X40 doesn&apos;t just wander. It uses a custom-tuned ROS&nbsp;2 Nav2 software stack
                  paired with 3D LiDAR and Visual Odometry.
                </p>
                <ul className="text-[#555] ml-5 mb-6 text-sm leading-[1.7] space-y-2">
                  <li>Grid-based &ldquo;Lawn Mower&rdquo; coverage planning.</li>
                  <li>Advanced Pure Pursuit path-following.</li>
                  <li>Real-time obstacle negotiation and safety recovery.</li>
                </ul>
              </div>
              <div className="shrink-0 w-full md:w-[45%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={NAV_IMG}
                  alt="Navigation"
                  className="w-full rounded-lg border border-[#e2e8f0]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
