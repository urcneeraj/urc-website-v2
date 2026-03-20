"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const LOGO =
  "https://raw.githubusercontent.com/urcneeraj/urcrobotics.github.io/main/URC%20(1).png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink =
    "font-semibold text-[14px] tracking-[0.01em] text-navy/95 hover:text-accent transition-colors duration-200";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] py-3.5 transition-all duration-300 ${
        scrolled
          ? "bg-white/[0.92] shadow-[0_10px_40px_rgba(2,6,23,0.08)] backdrop-blur-[10px]"
          : "bg-transparent"
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
          <li><Link href="/" className={navLink}>Home</Link></li>
          <li><Link href="/#products" className={navLink}>Products</Link></li>
          <li><Link href="/#technology" className={navLink}>Technology</Link></li>
          <li><Link href="/x40" className={navLink}>X40 Specs</Link></li>
        </ul>

        {/* CTA */}
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-[18px] py-3 border border-transparent bg-gradient-to-br from-accent to-[#0ea5e9] text-white shadow-[0_18px_50px_rgba(0,179,166,0.18)] transition-transform hover:-translate-y-px text-sm"
        >
          Request Demo
        </Link>
      </div>
    </nav>
  );
}
