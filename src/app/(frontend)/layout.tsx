import React from 'react';
import { Analytics } from '@vercel/analytics/next';
import { GoogleTag, NoScripts } from './scripts';

// The site now runs two design systems side by side while the migration
// proceeds: the home page carries the new one, every other page still carries
// brand system v2.0. Their stylesheets share six class names, so neither is
// imported here — each half loads its own in its own layout, and links between
// the two halves are plain anchors so the browser does a full page load and the
// two stylesheets are never in the document together.
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
    default: 'WizGrowth — Great brands. Bigger futures.',
    template: '%s — WizGrowth',
  },
  description:
    'WizGrowth brings search, demand and AI visibility together to move your brand forward. A growth marketing agency and academy in Kochi, Kerala.',
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
    <html lang="en">
      <GoogleTag />
      <body>
        <NoScripts />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
