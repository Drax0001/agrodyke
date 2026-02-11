import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agrodyke',
  description: 'Agricultural E-commerce & Knowledge Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
