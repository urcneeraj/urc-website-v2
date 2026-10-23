import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import { getSolution, SOLUTIONS } from "../../lib/solutions";

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: "Solutions | URC Robotics" };
  return {
    title: `${solution.label} | URC Robotics`,
    description: solution.description,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <main className="bg-offwhite pt-[96px]">
        <section className="mx-auto max-w-[1180px] px-6 pb-12">
          <p className="m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Solutions
          </p>
          <h1 className="mt-3 text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy md:text-[2.8rem]">
            {solution.label}
          </h1>
          <p className="mt-3 max-w-[920px] text-base font-medium leading-[1.7] text-slate-700 md:text-lg">
            {solution.description}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_16px_44px_rgba(19,42,65,0.12)]">
              <div className="relative aspect-[16/9] w-full bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200">
                {solution.imageSrc ? (
                  <Image
                    src={solution.imageSrc}
                    alt={solution.imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1180px) 100vw, 700px"
                    priority
                  />
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_16px_44px_rgba(19,42,65,0.12)]">
              <h2 className="m-0 text-lg font-semibold tracking-[-0.01em] text-navy">Use cases</h2>
              <ul className="mt-4 list-none space-y-3 p-0">
                {solution.useCases.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm font-medium leading-[1.65] text-slate-700 md:text-[15px]"
                  >
                    <span className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-100 text-navy">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/#products"
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-offwhite px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-white"
                >
                  View products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
