const specs = [
  { label: "Cleaning width",        value: "550 mm" },
  { label: "Suction width",         value: "800 mm" },
  { label: "Fresh / Recovery tanks",value: "40 L / 45 L" },
  { label: "Suction system",        value: "500 W" },
  { label: "Brush system",          value: "150 W x 2 @ 200 RPM" },
  { label: "Battery + runtime",     value: "24 V 65Ah, 6-8 hrs" },
  { label: "Navigation",            value: "LiDAR SLAM (ROS-based)" },
  { label: "Max speed + climb",     value: "~1.2 m/s, ~6%" },
  { label: "Noise level",           value: "75-80 dB" },
  { label: "Chassis",               value: "Heavy-duty 60 kg steel" },
];

export default function SpecsSnapshot() {
  return (
    <section id="x40-specs" className="py-[84px] bg-offwhite">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            X40 Specifications Snapshot
          </h2>
          <p className="mx-auto max-w-[720px] text-muted font-medium leading-[1.7] m-0">
            Commercial-grade performance built for long operating cycles.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {specs.map((s) => (
            <div
              key={s.label}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[16px] p-[18px_16px] shadow-[0_10px_30px_rgba(2,6,23,0.06)]"
            >
              <div className="text-muted font-extrabold text-[12px] uppercase tracking-[0.08em] mb-2.5">
                {s.label}
              </div>
              <div className="font-black text-[16px] text-navy leading-[1.3]">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
