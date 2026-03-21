"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OpeningSplash() {
  return (
    <motion.div
      className="fixed inset-0 z-[2000] bg-[radial-gradient(circle_at_50%_35%,#193654_0%,#0b1e33_45%,#050b14_100%)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 2.4 }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image
          src="/assets/opening-splash.png"
          alt="URC Robotics opening splash"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
