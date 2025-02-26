"use client";

import Hero from "@/components/pages-layout/Home/Hero";
import HomeEmploy from "@/components/pages-layout/Home/HomeEmploy";
import AgencySection from "@/components/pages-layout/Home/AgencySection";
import CommonBanner from "@/components/common/CommonBanner";
import Solution from "@/components/pages-layout/Home/Solution";
import RecruitmentCenters from "@/components/pages-layout/Home/RecruitmentCenters";
import Process from "@/components/pages-layout/Home/Process";
import FAQ from '@/components/pages-layout/Company/Fqa';

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeEmploy />
      <AgencySection />
      <Solution />
      <RecruitmentCenters />
      <Process />
      <CommonBanner
        title="Our mission is to connect the right workers with the right employers."
        buttonText="Let`s Cooperation"
        onButtonClick={() => {}}
      />
      <FAQ />
    </main>
  );
}
