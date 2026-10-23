"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/** Short fade — paired with `page.tsx` ~700ms unmount so users are not blocked. */
export default function OpeningSplash() {
  return (
    <motion.div
      className="fixed inset-0 z-[2000] bg-[radial-gradient(circle_at_50%_35%,#193654_0%,#0b1e33_45%,#050b14_100%)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Image
          src="/assets/opening-splash.png"
          alt="URC Robotics opening splash"
          fill
          priority
          sizes="100vw"
          quality={65}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
