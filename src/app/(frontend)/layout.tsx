import React from 'react';
import './styles.css';
import './wg.css';
import { Fraunces, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatWa } from '@/components/wg';
import { GoogleTag, NoScripts } from './scripts';

// Brand system v2.0: Inter for everything, Fraunces italic for the one
// accent word per headline. Both are exposed as CSS variables that wg.css
// reads through --sans and --accent.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

export const metadata = {
  // Without this, relative OpenGraph and canonical URLs cannot be resolved
  // to absolute ones and Next drops them.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.wizgrowth.com'),
  // Google Search Console site verification. Next renders this as
  // <meta name="google-site-verification" ...> in <head> on every page.
  // Keep it in place — removing it un-verifies the property.
  verification: {
    google: 'IAx8CcrOEudLEtLPONFG4hag5hWp7ZEaNsmVIJEXxhE',
  },
  title: {
    default: 'WizGrowth | Growth Marketing Agency & Academy in Kochi, Kerala',
    template: '%s — WizGrowth',
  },
  description:
    'WizGrowth grows brands with SEO, demand generation and AI citations (GEO) — and trains marketers on the same live client work. Kochi, Kerala; clients everywhere.',
  openGraph: {
    type: 'website',
    siteName: 'WizGrowth',
  },
};

export const viewport = {
  themeColor: '#F2EAD8',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <GoogleTag />
      <body>
        <NoScripts />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatWa />
        <Analytics />
      </body>
    </html>
  );
}
