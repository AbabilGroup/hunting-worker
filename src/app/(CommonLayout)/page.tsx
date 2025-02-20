"use client";

import Hero from "@/components/pages-layout/Home/Hero";
import HomeEmploy from "@/components/pages-layout/Home/HomeEmploy";
import AgencySection from "@/components/pages-layout/Home/AgencySection";
import CommonBanner from "@/components/common/CommonBanner";
import Solution from "@/components/pages-layout/Home/Solution";

export default function Home() {
  return (
    <main>
      <Hero />
      <CommonBanner
        title="Our mission is to connect the right workers with the right employers."
        buttonText="Let's Cooperation"
        onButtonClick={() => {}}
      />
      <HomeEmploy />
      <AgencySection />
      <Solution />
    </main>
  );
}
