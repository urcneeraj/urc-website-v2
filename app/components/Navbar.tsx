"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ExpandingButton from "./ExpandingButton";

const LOGO =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/URC%20(1).png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "Products" },
    { href: "/#technology", label: "Technology" },
    { href: "/x40", label: "X40 Specs" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] py-3.5 transition-all duration-300 ${
        scrolled
          ? "bg-white/[0.92] shadow-[0_10px_40px_rgba(2,6,23,0.08)] backdrop-blur-[10px]"
          : "bg-slate-950/20 backdrop-blur-[6px]"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo pill */}
        <Link
          href="/"
          aria-label="URC Robotics Home"
          className="inline-flex items-center px-3 py-1.5 bg-white/[0.78] border border-black/[0.12] rounded-full transition-colors hover:bg-white/[0.95]"
        >
          <Image src={LOGO} alt="URC Robotics" width={80} height={40} className="h-10 w-auto" unoptimized />
        </Link>

        {/* Links */}
        <ul className="hidden sm:flex flex-1 items-center justify-center gap-6 list-none p-0 m-0">
          {links.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`group relative inline-flex items-center font-semibold text-[14px] tracking-[0.01em] transition-all duration-250 hover:text-accent hover:-translate-y-0.5 ${
                  scrolled ? "text-navy/95" : "text-slate-100"
                }`}
              >
                {item.label}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-sun transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <ExpandingButton
          href="/contact"
          text="Contact Details"
          color="bg-gradient-to-br from-accent to-sun"
          className="px-[18px] py-3 text-sm font-bold text-navy"
        />
      </div>
    </nav>
  );
}
