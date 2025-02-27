"use client";

import { useRouter } from 'next/navigation';
import Hero from "@/components/pages-layout/Home/Hero";
import HomeEmploy from "@/components/pages-layout/Home/HomeEmploy";
import AgencySection from "@/components/pages-layout/Home/AgencySection";
import CommonBanner from "@/components/common/CommonBanner";
import Solution from "@/components/pages-layout/Home/Solution";
import RecruitmentCenters from "@/components/pages-layout/Home/RecruitmentCenters";
import Process from "@/components/pages-layout/Home/Process";

export default function Home() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

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
        buttonText="Let's Cooperation"
        onButtonClick={handleContactClick}
      />
    </main>
  );
}
