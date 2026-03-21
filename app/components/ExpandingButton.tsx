"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type ExpandingButtonProps = {
  href?: string;
  text: string;
  color?: string;
  className?: string;
  onComplete?: () => void;
};

export default function ExpandingButton({
  href,
  text,
  color = "bg-teal-500",
  className = "",
  onComplete,
}: ExpandingButtonProps) {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleClick() {
    if (isExpanding) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsExpanding(true);
    timeoutRef.current = window.setTimeout(() => {
      if (onComplete) {
        onComplete();
        window.setTimeout(() => setIsExpanding(false), 50);
        return;
      }
      if (href) router.push(href);
    }, 800);
  }

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        disabled={isExpanding}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 22 }}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_42px_rgba(2,6,23,0.28)] ${color} ${className}`}
      >
        <span className="pointer-events-none relative z-10">{text}</span>
      </motion.button>

      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed z-[9999] h-6 w-6 rounded-full ${color}`}
        style={{ left: origin.x - 12, top: origin.y - 12 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isExpanding ? { scale: 150, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}
