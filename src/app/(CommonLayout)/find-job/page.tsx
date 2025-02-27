"use client";
import JobForm from "@/components/pages-layout/Job/JobForm";
import CustomBanner from "@/components/pages-layout/Job/CustomBanner";
import FAQ from "@/components/pages-layout/Job/Fqa";
import Banner from '@/components/pages-layout/Company/Banner';

export default function FindJobPage() {
  return (
    <main className="min-h-screen pt-20">
      <JobForm />

      <CustomBanner
        text="No Breach of Agreements"
        variant="white"
      />

      <CustomBanner
        text="No fees for job seekers"
        variant="primary"
      />

      <CustomBanner
        text="No discrimination"
        variant="white"
      />

      <CustomBanner
        text="No violation of workers' rights"
        variant="primary"
      />

      <CustomBanner
        text="No fear, stress, or concern"
        variant="white"
      />

      <CustomBanner
        text="Together, we build a better future."
        variant="primary"
      />
        <FAQ />

        <Banner
        text="Do you have additional questions?"
        subtitle="Contact us with confidence and we will find a solution.
                  job@recruitment4u.com"
        withMargin={true}
      />

    </main>
  );
}

