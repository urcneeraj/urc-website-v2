const models = [
  {
    title: "Robotics as a Service (RaaS)",
    desc: "Service and automation delivered as subscription-based value.",
  },
  {
    title: "AMC + Software Subscriptions",
    desc: "Recurring revenue from maintenance and fleet software.",
  },
  {
    title: "Direct B2B Sales",
    desc: "Sales to businesses needing large-area commercial cleaning.",
  },
  {
    title: "Government Contracts & Rentals",
    desc: "Deployment via Govt cleaning contracts and rental-based offerings.",
  },
];

export default function BusinessModel() {
  return (
    <section id="business-model" className="py-[84px] bg-offwhite">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            Revenue Model &amp; Go-To-Market
          </h2>
          <p className="mx-auto max-w-[720px] m-0 font-medium leading-[1.7] text-black">
            Hybrid model designed for steady recurring revenue and rapid adoption.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-[18px] md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10">
          {models.map((m) => (
            <div
              key={m.title}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-[22px_20px] shadow-[0_10px_30px_rgba(2,6,23,0.06)] lg:rounded-[22px] lg:p-[28px_26px]"
            >
              <div className="font-black mb-2 text-navy">{m.title}</div>
              <p className="m-0 text-slate-500 font-medium leading-[1.7] text-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
