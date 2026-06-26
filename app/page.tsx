import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#10131c] text-[#e1e2ee] font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}