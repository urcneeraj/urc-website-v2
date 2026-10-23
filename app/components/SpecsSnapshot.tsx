import AdditionalAccessoriesBlock from "./AdditionalAccessoriesBlock";

const specs = [
  { label: "Cleaning width", value: "550 mm" },
  { label: "Suction width", value: "800 mm" },
  { label: "Fresh / Recovery tanks", value: "40 L / 45 L" },
  { label: "Suction system", value: "500 W" },
  { label: "Brush system", value: "150 W x 2 @ 200 RPM" },
  { label: "Battery + runtime", value: "24 V 65Ah, 6-8 hrs" },
  { label: "Navigation", value: "LiDAR SLAM (ROS-based)" },
  { label: "Max speed + climb", value: "~1.2 m/s, ~6%" },
  { label: "Noise level", value: "75-80 dB" },
  { label: "Chassis", value: "Heavy-duty 60 kg steel" },
];

export default function SpecsSnapshot() {
  return (
    <section id="x40-specs" className="bg-offwhite py-[84px]">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="mb-11 text-center">
          <h2 className="m-0 mb-2.5 text-[2.3rem] leading-[1.12] tracking-[-0.02em] text-navy">
            X40 Specifications Snapshot
          </h2>
          <p className="mx-auto m-0 max-w-[720px] font-medium leading-[1.7] text-black">
            Commercial-grade performance built for long operating cycles.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-7 xl:gap-8">
          {specs.map((s) => (
            <div
              key={s.label}
              className="rounded-[18px] border border-navy/15 bg-white/[0.98] p-[22px_18px] shadow-[0_14px_32px_rgba(19,42,65,0.12)] lg:rounded-[22px] lg:p-[26px_22px]"
            >
              <div className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.09em] text-slate-500">{s.label}</div>
              <div className="text-[18px] font-black leading-[1.3] text-navy lg:text-[19px]">{s.value}</div>
            </div>
          ))}
        </div>

        <AdditionalAccessoriesBlock />
      </div>
    </section>
  );
}
