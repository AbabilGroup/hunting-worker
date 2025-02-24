import CompanyForm from '../../../components/pages-layout/Company/CompanyForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company | Hunting Worker',
  description: 'Partner with us to find the right workers for your company. Fill out our inquiry form and we will get back to you as soon as possible.',
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen pt-20">
      <CompanyForm />
    </main>
  );
}