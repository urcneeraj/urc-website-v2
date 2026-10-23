"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Fires once when smooth scroll reaches the top after clicking the button */
  onArrivedAtTop?: () => void;
};

export default function ScrollToTopButton({ onArrivedAtTop }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let done = false;
    const onScrollWhileScrolling = () => {
      if (done || window.scrollY > 4) return;
      done = true;
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScrollWhileScrolling);
      onArrivedAtTop?.();
    };
    const timer = window.setTimeout(() => {
      window.removeEventListener("scroll", onScrollWhileScrolling);
      if (!done && window.scrollY <= 4) {
        done = true;
        onArrivedAtTop?.();
      }
    }, 1200);
    window.addEventListener("scroll", onScrollWhileScrolling, { passive: true });
  }

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-[1100] inline-flex h-12 w-12 items-center justify-center rounded-full border border-sun/55 bg-[#102941]/90 text-xs font-black tracking-[0.08em] text-sun shadow-[0_14px_28px_rgba(2,6,23,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#163850] ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      ↑
    </button>
  );
}
