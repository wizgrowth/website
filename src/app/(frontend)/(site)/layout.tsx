import type { ReactNode } from 'react';
import { Fraunces, Inter } from 'next/font/google';
import '../styles.css';
import '../wg.css';
import { Header } from '@components/header';
import { Footer } from '@/components/footer';
import { FloatWa } from '@/components/wg';

// Brand system v2.0 pages: everything except the home page. The stylesheets and
// fonts load here rather than in the root layout so the home page, which runs
// the newer design, never receives them.
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

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} ${fraunces.variable}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatWa />
    </div>
  );
}
