import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Features from "./components/Features";
import VideoSection from "./components/VideoSection";
import SpecsSnapshot from "./components/SpecsSnapshot";
import InvestorSection from "./components/InvestorSection";
import ProblemSection from "./components/ProblemSection";
import BusinessModel from "./components/BusinessModel";
import Traction from "./components/Traction";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Features />
        <VideoSection />
        <SpecsSnapshot />
        <InvestorSection />
        <ProblemSection />
        <BusinessModel />
        <Traction />
      </main>
      <Footer />
    </>
  );
}
