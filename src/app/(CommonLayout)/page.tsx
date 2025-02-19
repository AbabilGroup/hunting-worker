"use client";

import Hero from "@/components/pages-layout/Home/Hero";
import HomeEmploy from "@/components/pages-layout/Home/HomeEmploy";
import AgencySection from "@/components/pages-layout/Home/AgencySection";
import CommonBanner from "@/components/common/CommonBanner";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Solution from "@/components/pages-layout/Home/Solution";

export default function Home() {
  const CountUpSubtitle = (
    <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
      <div className="flex items-center gap-1">
        <CountUp
          end={3000}
          duration={2}
          enableScrollSpy
          scrollSpyOnce
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
        />
        <span className="text-base">+ Workers</span>
      </div>
      <div className="flex items-center gap-1">
        <CountUp
          end={250}
          duration={2}
          enableScrollSpy
          scrollSpyOnce
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
        />
        <span className="text-base">+ Clients</span>
      </div>
    </motion.div>
  );

  return (
    <main>
      <Hero />
      <CommonBanner
        title="Our mission is to connect the right workers with the right employers."
        subtitle={CountUpSubtitle}
      />
      <HomeEmploy />
      <AgencySection />
      <Solution />
    </main>
  );
}
