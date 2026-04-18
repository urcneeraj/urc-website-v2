"use client";

import { useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import X40HotspotShowcase from "./components/X40HotspotShowcase";
import SuitableForIndustries from "./components/SuitableForIndustries";
import OpeningSplash from "./components/OpeningSplash";
import ScrollToTopButton from "./components/ScrollToTopButton";

function sectionSkeleton() {
  return <div className="min-h-[28vh] w-full bg-[#07182A]/80" aria-hidden />;
}

const Products = dynamic(() => import("./components/Products"), { loading: sectionSkeleton });
const Features = dynamic(() => import("./components/Features"), { loading: sectionSkeleton });
const AnalyticsSection = dynamic(() => import("./components/AnalyticsSection"), { loading: sectionSkeleton });
const MediaShowcase = dynamic(() => import("./components/MediaShowcase"), { loading: sectionSkeleton });
const SpecsSnapshot = dynamic(() => import("./components/SpecsSnapshot"), { loading: sectionSkeleton });
const InvestorSection = dynamic(() => import("./components/InvestorSection"), { loading: sectionSkeleton });
const ProblemSection = dynamic(() => import("./components/ProblemSection"), { loading: sectionSkeleton });
const BusinessModel = dynamic(() => import("./components/BusinessModel"), { loading: sectionSkeleton });
const Traction = dynamic(() => import("./components/Traction"), { loading: sectionSkeleton });
const ServingRobotSection = dynamic(() => import("./components/ServingRobotSection"), {
  loading: sectionSkeleton,
});
const VideoSection = dynamic(() => import("./components/VideoSection"), { loading: sectionSkeleton });
const Footer = dynamic(() => import("./components/Footer"));

/** Below-the-fold sections are code-split so first paint ships less JS. */
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const skipUrl = params.get("skipSplash") === "1";
    let skipStorage = false;
    try {
      skipStorage = sessionStorage.getItem("urc_skip_splash") === "1";
    } catch {
      /* ignore */
    }
    if (skipUrl || skipStorage) {
      try {
        sessionStorage.removeItem("urc_skip_splash");
      } catch {
        /* ignore */
      }
      queueMicrotask(() => {
        setShowSplash(false);
        if (skipUrl) window.history.replaceState({}, "", "/");
      });
      return;
    }
    const id = window.setTimeout(() => setShowSplash(false), 700);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {showSplash ? <OpeningSplash /> : null}
      <Navbar />
      <motion.main
        className="min-h-screen overflow-x-clip transition-colors duration-700 ease-out"
        style={{ backgroundColor: "#07182A" }}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Hero />
        <X40HotspotShowcase />
        <SuitableForIndustries />
        <Products />
        <Features />
        <AnalyticsSection />
        <MediaShowcase />
        <SpecsSnapshot />
        <InvestorSection />
        <ProblemSection />
        <BusinessModel />
        <Traction />
        <ServingRobotSection />
        <VideoSection />
      </motion.main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
