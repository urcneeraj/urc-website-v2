"use client";

import Link from "next/link";

export default function BackToHomeLink() {
  return (
    <Link
      href="/?skipSplash=1"
      onClick={() => {
        try {
          sessionStorage.setItem("urc_skip_splash", "1");
        } catch {
          /* ignore */
        }
      }}
      className="truncate font-semibold text-[14px] text-navy/95 hover:text-accent transition-colors"
    >
      ← Back to Home
    </Link>
  );
}
