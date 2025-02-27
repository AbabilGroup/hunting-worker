import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Jobs | Recruitment4u',
  description: 'Find the right job for you. Search through our job listings and apply to the ones that interest you.',
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}