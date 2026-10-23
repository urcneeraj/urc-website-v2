"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CTA_GRADIENT_BG, CTA_GRADIENT_TEXT } from "../lib/cta";
import { SITE_LOGO_SRC } from "../lib/brand";

const LIGHT_SURFACE_PATHS = new Set(["/contact"]);

type DropdownItem = { label: string; href: string };

const productsMenu: DropdownItem[] = [
  { label: "URC X40", href: "/x40" },
  { label: "Service Robot", href: "/#autonomous-serving-robot" },
];

const technologyMenu: DropdownItem[] = [
  { label: "Platform & stack", href: "/#technology" },
  { label: "Operations dashboard", href: "/#dashboard" },
];

const x40Menu: DropdownItem[] = [
  { label: "Specs snapshot", href: "/#x40-specs" },
  { label: "Full product page", href: "/x40" },
];

/**
 * CSS `group/drop` + `group-hover` keeps the panel open while the pointer moves from the
 * label into the menu. The previous JS `open` state failed because the closed panel used
 * `pointer-events-none`, so the pointer fell through to the page and fired `mouseleave` on the `<li>`.
 */
function NavDropdown({
  label,
  href,
  items,
  solidContrast,
  darkText,
}: {
  label: string;
  href: string;
  items: DropdownItem[];
  solidContrast: boolean;
  darkText: boolean;
}) {
  /* Force white ( !text-white ) so globals / visited never tint these links */
  const triggerTone = darkText
    ? "text-[#0a1628] !text-[#0a1628] hover:opacity-80"
    : solidContrast
      ? "text-white !text-white hover:opacity-90"
      : "text-white !text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.95),0_0_18px_rgba(0,0,0,0.55)] hover:opacity-90";

  return (
    <li className="group/drop relative">
      <div className="flex items-center gap-1">
        <Link
          href={href}
          className={`group relative inline-flex items-center text-[14px] font-semibold tracking-[0.01em] transition-colors duration-200 ${triggerTone}`}
        >
          {label}
          <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-sun transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <span className={`text-[11px] font-bold leading-none ${triggerTone}`} aria-hidden>
          ▾
        </span>
      </div>

      <div
        className="absolute left-1/2 top-full z-[1100] min-w-[220px] -translate-x-1/2 pt-2 opacity-0 invisible transition-[opacity,visibility] duration-150 [transition-delay:0ms] group-hover/drop:visible group-hover/drop:opacity-100 group-hover/drop:[transition-delay:0ms] group-focus-within/drop:visible group-focus-within/drop:opacity-100"
        role="menu"
        aria-label={`${label} submenu`}
      >
        <div className="isolate rounded-xl border border-navy/15 bg-white py-2 text-[#0a1628] shadow-[0_16px_40px_rgba(19,42,65,0.22)]">
          <ul className="m-0 list-none p-0">
            {items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  className="block px-4 py-2.5 text-[13px] font-semibold text-[#0a1628] transition-colors hover:bg-slate-100 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    if (pathname !== "/contact") router.prefetch("/contact");
  }, [pathname, router]);

  const onLightSurface = pathname ? LIGHT_SURFACE_PATHS.has(pathname) : false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hero = document.getElementById("home");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry?.isIntersecting ?? true),
      { threshold: 0.15 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const showBlurBar = scrolled && !heroInView;
  const darkText = onLightSurface;

  const solidContrast = showBlurBar || onLightSurface;
  const navLinkTone = darkText
    ? "text-[#0a1628] !text-[#0a1628] hover:opacity-80"
    : solidContrast
      ? "text-white !text-white hover:opacity-90"
      : "text-white !text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.95),0_0_18px_rgba(0,0,0,0.55)] hover:opacity-90";

  const onHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] overflow-visible py-2.5 sm:py-3.5 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
        showBlurBar
          ? darkText
            ? "border-b border-black/[0.08] bg-white/[0.82] shadow-[0_12px_40px_rgba(2,6,23,0.12)] backdrop-blur-[12px]"
            : "border-b border-white/10 bg-[#0a1628]/70 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-[12px]"
          : "bg-transparent"
      }`}
    >
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-12">
        <Link
          href="/"
          aria-label="URC Robotics Home"
          className={`inline-flex items-center rounded-full border px-2.5 py-1 sm:px-3 sm:py-1.5 transition-colors ${
            darkText
              ? "border-black/[0.12] bg-white/[0.92] shadow-[0_2px_12px_rgba(2,6,23,0.10)] hover:bg-white"
              : solidContrast
                ? "border-white/20 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.25)] hover:bg-white"
                : "border-black/[0.12] bg-white/[0.78] hover:bg-white/[0.95]"
          }`}
          onClick={onHomeClick}
        >
          <Image
            src={SITE_LOGO_SRC}
            alt="URC Robotics"
            width={80}
            height={40}
            className="h-8 w-auto sm:h-9 md:h-10"
            unoptimized
            priority
          />
        </Link>

        <ul className="m-0 hidden list-none items-center justify-center gap-5 p-0 sm:flex md:gap-7 lg:gap-10 xl:gap-14">
          <li>
            <Link
              href="/"
              onClick={onHomeClick}
              className={`group relative inline-flex items-center text-[14px] font-semibold tracking-[0.01em] transition-all duration-200 hover:-translate-y-0.5 ${navLinkTone}`}
            >
              Home
              <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent to-sun transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </li>

          <NavDropdown label="Products" href="/#products" items={productsMenu} solidContrast={solidContrast} darkText={darkText} />
          <NavDropdown label="Technology" href="/#technology" items={technologyMenu} solidContrast={solidContrast} darkText={darkText} />
          <NavDropdown label="X40 Specs" href="/x40" items={x40Menu} solidContrast={solidContrast} darkText={darkText} />
        </ul>

        <div className="justify-self-end">
          {pathname === "/contact" ? (
            <Link
              href="/"
              prefetch
              className={`inline-flex items-center justify-center rounded-full px-[18px] py-3 text-sm ${CTA_GRADIENT_BG} ${CTA_GRADIENT_TEXT}`}
            >
              Back
            </Link>
          ) : (
            <Link
              href="/contact"
              prefetch
              className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_16px_42px_rgba(2,6,23,0.28)] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:px-[18px] sm:py-3 ${CTA_GRADIENT_BG} ${CTA_GRADIENT_TEXT}`}
            >
              Contact Details
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
