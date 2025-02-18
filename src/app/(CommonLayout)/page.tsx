"use client";

import Hero from "@/components/pages-layout/Home/Hero";
import HomeEmploy from "@/components/pages-layout/Home/HomeEmploy";
import AgencySection from "@/components/pages-layout/Home/AgencySection";

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeEmploy />
      <AgencySection />
    </main>
  );
}
