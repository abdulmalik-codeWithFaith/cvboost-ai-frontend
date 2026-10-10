"use client";

import { MotionConfig } from "framer-motion";
import { Footer, Navbar, ScrollProgress } from "./HomeChrome";
import { Hero, Marquee } from "./HomeHero";
import HomeTrySection from "./HomeTrySection";
import { BeforeAfter, Features, HowItWorks } from "./HomeProductSections";
import { FAQ, FinalCTA, Pricing, Stats, Testimonials } from "./HomeSocialSections";

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip text-on-surface antialiased">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <HomeTrySection />
          <Features />
          <HowItWorks />
          <BeforeAfter />
          <Stats />
          <Testimonials />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}