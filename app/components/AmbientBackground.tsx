"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface AmbientBackgroundProps {
  scrollYProgress?: MotionValue<number>;
}

export default function AmbientBackground({ scrollYProgress }: AmbientBackgroundProps) {
  const localScroll = useScroll();
  const progress = scrollYProgress ?? localScroll.scrollYProgress;

  const orbOneShift = useTransform(progress, [0, 1], ["0%", "45%"]);
  const orbTwoShift = useTransform(progress, [0, 1], ["0%", "-40%"]);
  const orbThreeShift = useTransform(progress, [0, 1], ["0%", "55%"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-28 -top-20 h-96 w-96 rounded-full bg-[#1b4e7a] opacity-30 mix-blend-screen blur-[100px]"
        style={{ y: orbOneShift }}
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-[-120px] top-[18%] h-[28rem] w-[28rem] rounded-full bg-[#0ea5a4] opacity-25 mix-blend-screen blur-[110px]"
        style={{ y: orbTwoShift }}
        animate={{ x: [0, -45, 40, 0], y: [0, 45, -35, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[-130px] left-[30%] h-[30rem] w-[30rem] rounded-full bg-[#2f4f74] opacity-28 mix-blend-screen blur-[120px]"
        style={{ y: orbThreeShift }}
        animate={{ x: [0, 40, -55, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
