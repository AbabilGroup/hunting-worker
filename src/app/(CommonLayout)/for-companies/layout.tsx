import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company | Recruitment4u',
  description: 'Partner with us to find the right workers for your company. Fill out our inquiry form and we will get back to you as soon as possible.',
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}