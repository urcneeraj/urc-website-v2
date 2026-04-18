const problems = [
  {
    title: "Import Reliance",
    desc: "Heavy dependence on imported robotic technology increases cost and delivery risk.",
  },
  {
    title: "Labor Challenges",
    desc: "High salaries and absenteeism make consistent large-area cleaning difficult.",
  },
  {
    title: "Hygiene Pressure",
    desc: "Post-COVID demand for cleanliness raises the need for reliable, repeatable cleaning.",
  },
  {
    title: "Affordable Reliability Gap",
    desc: "Lack of low-cost, dependable service robots and skilled cleaners limits scale.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-[84px] bg-offwhite">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-11">
          <h2 className="text-[2.3rem] leading-[1.12] tracking-[-0.02em] m-0 mb-2.5 text-navy">
            The Problem We Solve
          </h2>
          <p className="mx-auto max-w-[720px] m-0 font-medium leading-[1.7] text-black">
            Clear operational pain points that drive strong adoption for autonomous cleaning.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-[18px] md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-white/[0.92] border border-black/[0.12] rounded-[18px] p-[22px_20px] shadow-[0_10px_30px_rgba(2,6,23,0.06)] lg:rounded-[22px] lg:p-[28px_26px]"
            >
              <div className="font-black mb-2 text-navy">{p.title}</div>
              <p className="m-0 text-slate-500 font-medium leading-[1.7] text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
