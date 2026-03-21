"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Features from "./components/Features";
import VideoSection from "./components/VideoSection";
import ServingRobotSection from "./components/ServingRobotSection";
import RobotViewer from "./components/RobotViewer";
import AnalyticsSection from "./components/AnalyticsSection";
import MediaShowcase from "./components/MediaShowcase";
import SpecsSnapshot from "./components/SpecsSnapshot";
import InvestorSection from "./components/InvestorSection";
import ProblemSection from "./components/ProblemSection";
import BusinessModel from "./components/BusinessModel";
import Traction from "./components/Traction";
import Footer from "./components/Footer";
import OpeningSplash from "./components/OpeningSplash";
import AmbientBackground from "./components/AmbientBackground";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#07182A", "#0F172A", "#050B14"]
  );

  useEffect(() => {
    const id = window.setTimeout(() => setShowSplash(false), 3000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      {showSplash ? <OpeningSplash /> : null}
      <AmbientBackground scrollYProgress={scrollYProgress} />
      <Navbar />
      <motion.main
        className="min-h-screen overflow-x-clip transition-colors duration-700 ease-out"
        style={{ backgroundColor }}
        initial={{ opacity: 0.97, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Hero />
        <ServingRobotSection />
        <VideoSection />
        <RobotViewer />
        <Products />
        <Features />
        <AnalyticsSection />
        <MediaShowcase />
        <SpecsSnapshot />
        <InvestorSection />
        <ProblemSection />
        <BusinessModel />
        <Traction />
      </motion.main>
      <Footer />
    </>
  );
}
