import Banner from '@/components/pages-layout/Company/Banner';
import CompanyForm from '@/components/pages-layout/Company/CompanyForm';
import Industries from '@/components/pages-layout/Company/Industries';
import Services from '@/components/pages-layout/Company/Services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company | Hunting Worker',
  description: 'Partner with us to find the right workers for your company. Fill out our inquiry form and we will get back to you as soon as possible.',
};

export default function CompanyPage() {
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
    </main>
  );
}