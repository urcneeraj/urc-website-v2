"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ href, children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring — quick to follow, smooth snap-back
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Pull the button 35% of the way toward the cursor
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        // Teal glow blooms on hover, recedes on leave
        boxShadow: hovered
          ? "0 0 42px rgba(0,179,166,0.55), 0 18px 50px rgba(0,179,166,0.28)"
          : "0 18px 50px rgba(0,179,166,0.18)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block rounded-full transition-shadow duration-300"
    >
      <Link
        href={href}
        className={`inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-6 py-3.5 text-[15px] border border-transparent bg-gradient-to-br from-accent to-[#0ea5e9] text-white ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
