import './brand.css';
import { Fraunces, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { StickyCta } from './components/shared';

// Brand system v2.0: Inter for reading, Fraunces italic as the accent voice.
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

// Wraps the services hub and every /services/<slug>/ page. The `.wg` class
// scopes the brand tokens so the rest of the site keeps its own styles.
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`wg ${inter.variable} ${fraunces.variable}`}>
      {children}
      <StickyCta />
    </div>
  );
}
