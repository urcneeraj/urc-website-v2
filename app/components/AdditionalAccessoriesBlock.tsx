"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CTA_GRADIENT_BG, CTA_GRADIENT_TEXT } from "../lib/cta";

const accessories = [
  {
    src: "/assets/accessory-curved-squeegee.png",
    alt: "Curved floor squeegee attachment for recovery",
    caption: "Curved squeegee",
  },
  {
    src: "/assets/accessory-mop-pads.png",
    alt: "Microfiber mop pad refills",
    caption: "Mop pad refills",
  },
  {
    src: "/assets/accessory-disc-brushes.png",
    alt: "Disc scrub brushes",
    caption: "Disc brushes",
  },
];

export default function AdditionalAccessoriesBlock() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div id="additional-accessories" className="mt-16 border-t border-navy/10 pt-14">
      <div className="flex justify-center">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
          className={`relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold shadow-[0_16px_42px_rgba(2,6,23,0.28)] md:min-h-[52px] md:px-8 md:py-3.5 md:text-[15px] ${CTA_GRADIENT_BG} ${CTA_GRADIENT_TEXT}`}
        >
          Additional accessories
        </motion.button>
      </div>
      <p className="mx-auto mt-4 max-w-[640px] text-center text-sm font-medium leading-relaxed text-black">
        OEM-fit parts — open the gallery to preview squeegees, mop pads, and scrub brushes for the X40 platform.
      </p>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="accessories-layer"
            className="fixed inset-0 z-[2050] flex items-end justify-center sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute inset-0 bg-navy/70 backdrop-blur-[3px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="accessories-dialog-title"
              className="relative z-10 flex max-h-[min(92dvh,900px)] w-full max-w-[640px] flex-col overflow-hidden rounded-t-[24px] border border-navy/15 bg-offwhite shadow-[0_-12px_48px_rgba(2,6,23,0.38)] sm:max-h-[min(88dvh,880px)] sm:rounded-[22px] sm:shadow-[0_24px_80px_rgba(2,6,23,0.35)]"
              initial={{ y: 56, opacity: 0.96 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-navy/10 bg-white/95 px-5 py-4">
                <h3 id="accessories-dialog-title" className="m-0 text-lg font-extrabold text-navy md:text-xl">
                  Additional accessories
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-navy/20 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-accent/50 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-8 pb-4">
                  {accessories.map((a, i) => (
                    <motion.div
                      key={a.src}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden rounded-[18px] border border-navy/12 bg-white shadow-[0_10px_28px_rgba(19,42,65,0.1)]"
                    >
                      <div className="relative aspect-[4/3] w-full bg-[#f0f3f8]">
                        <Image
                          src={a.src}
                          alt={a.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, 600px"
                          className="object-contain p-4"
                        />
                      </div>
                      <p className="m-0 border-t border-navy/10 px-4 py-3 text-center text-sm font-bold text-navy">{a.caption}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
