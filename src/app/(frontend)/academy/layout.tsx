import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} bg-[#F4EEE2] text-[#0E1715] antialiased [font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] [-webkit-font-smoothing:antialiased] [text-rendering:optimizeLegibility] [font-feature-settings:'ss01'_on,'cv11'_on] overflow-x-hidden`}
    >
      {children}
    </div>
  );
}
