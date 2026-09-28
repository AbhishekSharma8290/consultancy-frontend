import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Balaji Placement Service | Top Staffing & Recruitment Portal Gwalior MP',
  description:
    'Balaji Placement Service - Hazira, Gwalior (M.P.). Leading recruitment solutions for FMCG, BFSI, BPO, Industrial & Accounting roles. No upfront charges before interview.',
  keywords: [
    'Placement Service Gwalior',
    'Jobs in Gwalior',
    'Balaji Placement',
    'Account Executive jobs',
    'Tally GST jobs Gwalior',
    'Female urgent jobs Gwalior',
    'Staffing solutions MP',
  ],
  authors: [{ name: 'Balaji Placement Service Gwalior' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
