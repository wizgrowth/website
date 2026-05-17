import React from 'react';
import './styles.css';
import { Header } from '@components/header';
import { Footer } from '@/components/footer';
import { Analytics } from '@vercel/analytics/next';
import { Poppins } from 'next/font/google';
import { GoogleTag, NoScripts } from './scripts';

// Configure the font with all variants you need
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  // This makes the font variable accessible
  variable: '--font-poppins',
});

export const metadata = {
  title: {
    default: 'Wizgrowth - India’s Leading Digital Marketing Agency',
    template: '%s - Wizgrowth',
  },
  description:
    'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
  openGraph: {
    title: 'Wizgrowth - India’s Leading Digital Marketing Agency',
    description:
      'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
    type: 'website',
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={poppins.variable}>
      <GoogleTag />
      <body>
        <NoScripts />
        <main>
          <Header />
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
