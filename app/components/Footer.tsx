import { SITE_LOGO_SRC } from "../lib/brand";

export default function Footer() {
  return (
    <footer id="contact" className="bg-midnight pt-[70px] pb-9">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-[42px] items-start justify-between">

          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SITE_LOGO_SRC}
              alt="URC Robotics"
              className="h-[46px] w-auto mb-3.5 brightness-0 invert"
            />
            {/* Primary copy — slate-100 for strong contrast against midnight */}
            <p className="m-0 text-slate-100 font-semibold">
              Innovating the Future of Automation.
            </p>
          </div>

          {/* Contact */}
          <div className="w-full md:w-[560px]">
            <h4 className="m-0 mb-2.5 text-slate-100 text-[1.05rem] font-bold">Contact Us</h4>
            <div className="border border-white/15 bg-white/[0.05] p-5 md:p-7 lg:p-8 shadow-[0_16px_42px_rgba(2,6,23,0.3)]">
              <p className="my-2 text-base">
                <strong className="font-semibold" style={{ color: "#e2e8f0" }}>Email: </strong>
                <a
                  href="mailto:urcrobotics@gmail.com"
                  className="underline underline-offset-[3px] hover:text-accent transition-colors"
                  style={{ color: "#e2e8f0" }}
                >
                  urcrobotics@gmail.com
                </a>
              </p>

              <p className="my-2 text-base">
                <strong className="font-semibold" style={{ color: "#e2e8f0" }}>Phone: </strong>
                <a
                  href="tel:+916005173806"
                  className="underline underline-offset-[3px] hover:text-accent transition-colors"
                  style={{ color: "#e2e8f0" }}
                >
                  +91 6005173806
                </a>
              </p>

              <p className="my-2 text-slate-100 text-base">
                <strong className="text-slate-100 font-semibold">HQ:</strong> Jammu, India
                &nbsp;|&nbsp;
                <strong className="text-slate-100 font-semibold">Mfg:</strong> Gujarat, India
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[38px] pt-[18px] border-t border-white/[0.12]">
          {/* Sub-text copyright */}
          <p className="m-0 text-slate-400 text-sm">
            © 2026 URC Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
