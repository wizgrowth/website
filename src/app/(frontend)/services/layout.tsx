import type { ReactNode } from 'react';
import { StickyCta } from '@/components/wg';

// Every services page is a money page: it gets the sticky phone CTA.
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <StickyCta
        reassure="Free 30-minute call · targets in writing before you commit"
        href="/contact/"
        label="Book a growth call"
      />
    </>
  );
}
