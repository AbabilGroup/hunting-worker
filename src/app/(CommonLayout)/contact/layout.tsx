import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Recruitment4u',
  description: 'Contact us for any inquiries or questions you may have. We will get back to you as soon as possible.',
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}