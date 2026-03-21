"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [pressed, setPressed] = useState(false);
  const [interactive, setInteractive] = useState(false);

  // Faster response with a premium spring trail
  const springX = useSpring(x, { stiffness: 520, damping: 32, mass: 0.16 });
  const springY = useSpring(y, { stiffness: 520, damping: 32, mass: 0.16 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const cx = event.clientX;
      const cy = event.clientY;
      x.set(cx - 16);
      y.set(cy - 16);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const hit = target.closest("a,button,input,textarea,select,[data-cursor='hover']");
      setInteractive(Boolean(hit));
    };
    const onOut = () => setInteractive(false);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [x, y]);

  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block" style={{ x: springX, y: springY }}>
      <motion.div
        animate={{
          scale: pressed ? 0.82 : interactive ? 1.3 : 1,
          rotate: pressed ? -18 : interactive ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="relative h-8 w-8"
      >
        <div className="absolute inset-0 rounded-full border-2 border-cyan-300/90" />
        <motion.div
          className="absolute inset-[9px] rounded-full bg-cyan-300"
          animate={{ scale: interactive ? 0.72 : 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        />
      </motion.div>
    </motion.div>
  );
}
