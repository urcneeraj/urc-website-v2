import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact URC Robotics",
  description: "Contact details for URC Robotics including email, phone, and office locations.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-offwhite min-h-screen pt-[110px] pb-16">
        <section className="mx-auto max-w-[980px] px-6">
          <div className="rounded-[22px] border border-navy/15 bg-white p-7 shadow-[0_16px_40px_rgba(19,42,65,0.12)]">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-slate-500">Contact Information</p>
            <h1 className="m-0 text-[2.4rem] leading-[1.08] tracking-[-0.02em] text-navy">Get in touch with URC Robotics</h1>
            <p className="mt-3 max-w-[640px] text-slate-600 text-sm leading-[1.8]">
              Reach us for demos, deployments, pricing, technical queries, and investor briefings.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-navy/12 bg-offwhite p-4">
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Email</p>
                <a
                  href="mailto:urcrobotics@gmail.com"
                  className="mt-1 inline-block text-lg font-semibold text-navy underline underline-offset-4 hover:text-accent transition-colors"
                >
                  urcrobotics@gmail.com
                </a>
              </div>
              <div className="rounded-xl border border-navy/12 bg-offwhite p-4">
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Phone</p>
                <a
                  href="tel:+916005173806"
                  className="mt-1 inline-block text-lg font-semibold text-navy underline underline-offset-4 hover:text-accent transition-colors"
                >
                  +91 6005173806
                </a>
              </div>
              <div className="rounded-xl border border-navy/12 bg-offwhite p-4">
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Headquarters</p>
                <p className="mt-1 mb-0 text-base font-semibold text-navy">Jammu, India</p>
              </div>
              <div className="rounded-xl border border-navy/12 bg-offwhite p-4">
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">Manufacturing</p>
                <p className="mt-1 mb-0 text-base font-semibold text-navy">Gujarat, India</p>
              </div>
            </div>

            <div className="mt-7">
              <Link
                href="/#traction"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-sun px-6 py-3 text-sm font-bold text-navy shadow-[0_12px_30px_rgba(239,8,6,0.24)] hover:-translate-y-px transition-transform"
              >
                Open Investor Enquiry Form
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
