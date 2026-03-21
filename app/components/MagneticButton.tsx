"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface Props {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ href, onClick, children, className = "" }: Props) {
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        x: springX,
        y: springY,
        // Teal glow blooms on hover, recedes on leave
        boxShadow: hovered
          ? "0 0 42px rgba(239,8,6,0.45), 0 18px 50px rgba(255,237,41,0.3)"
          : "0 18px 50px rgba(239,8,6,0.2)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block rounded-full transition-shadow duration-300 will-change-transform"
    >
      {href ? (
        <Link
          href={href}
          className={`inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-6 py-3.5 text-[15px] border border-transparent bg-gradient-to-br from-accent to-sun text-navy ${className}`}
        >
          {children}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex items-center justify-center gap-2.5 font-bold rounded-full px-6 py-3.5 text-[15px] border border-transparent bg-gradient-to-br from-accent to-sun text-navy ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
