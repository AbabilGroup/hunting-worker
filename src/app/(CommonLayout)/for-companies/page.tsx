"use client";  

import Banner from '@/components/pages-layout/Company/Banner';
import CompanyForm from '@/components/pages-layout/Company/CompanyForm';
import Industries from '@/components/pages-layout/Company/Industries';
import Services from '@/components/pages-layout/Company/Services';
import CommonBanner from '@/components/common/CommonBanner';
import FAQ from '@/components/pages-layout/Company/Fqa';

export default function CompanyPage() {
  const handleCooperate = () => {
  };

  return (
    <main className="min-h-screen pt-20">
      <CompanyForm />
      <Banner 
        text="We invest capital to gain in-depth knowledge of every industry."
        withMargin={true}
      />
      <Industries />
      <Banner 
        text="We carefully craft selection processes for each specific profession."
        withMargin={true}
      />
      <Services />
      <CommonBanner
        title="Using innovations, we maximize your potential."
        buttonText="Let's Cooperate"
        onButtonClick={handleCooperate}
      />
      <FAQ />
      <Banner
        text="Short on time?"
        subtitle="Contact us now and we will find a solution immediately. info@recruitment4u.com"
        withMargin={true}
      />
    </main>
  );
}