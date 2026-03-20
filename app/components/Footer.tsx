const LOGO =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/URC%20(1).png";

export default function Footer() {
  return (
    <footer id="contact" className="bg-midnight text-[#cbd5e1] pt-[70px] pb-9">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-[42px] items-start justify-between">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO}
              alt="URC Robotics"
              className="h-[46px] w-auto mb-3.5 brightness-0 invert"
            />
            <p className="m-0 text-[#cbd5e1]/90 font-semibold">
              Innovating the Future of Automation.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="m-0 mb-2.5 text-white text-[1.05rem]">Contact Us</h4>
            <p className="my-2 text-[#cbd5e1]/90 text-sm">
              <strong>Email:</strong>{" "}
              <a href="mailto:urcrobotics@gmail.com" className="text-white underline underline-offset-[3px]">
                urcrobotics@gmail.com
              </a>
            </p>
            <p className="my-2 text-[#cbd5e1]/90 text-sm">
              <strong>Phone:</strong>{" "}
              <a href="tel:+916005173806" className="text-white underline underline-offset-[3px]">
                +91 6005173806
              </a>
            </p>
            <p className="my-2 text-[#cbd5e1]/90 text-sm">
              <strong>HQ:</strong> Jammu, India &nbsp;|&nbsp; <strong>Mfg:</strong> Gujarat, India
            </p>
          </div>
        </div>

        <div className="mt-[38px] pt-[18px] border-t border-white/[0.12]">
          <p className="m-0 text-[#cbd5e1]/85 text-sm">
            © 2026 URC Robotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
