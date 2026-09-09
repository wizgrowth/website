import Link from 'next/link';
import type { ServicePage } from '@/payload-types';
import { Reveal } from '../reveal';

type HeroProps = { service: ServicePage };

const microlabel =
  'font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em]';

export function Hero({ service }: HeroProps) {
  return (
    <header className="pt-32 max-[720px]:pt-24">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <nav
          aria-label="Breadcrumb"
          className={`${microlabel} mb-10 flex flex-wrap items-center gap-2 text-[rgba(14,23,21,0.62)] max-[720px]:mb-7`}
        >
          <Link href="/" className="hover:text-[#0E1715]">
            Home
          </Link>
          <span aria-hidden="true" className="text-[rgba(14,23,21,0.32)]">
            /
          </span>
          <Link href="/services/" className="hover:text-[#0E1715]">
            Services
          </Link>
          <span aria-hidden="true" className="text-[rgba(14,23,21,0.32)] max-[560px]:hidden">
            /
          </span>
          <span aria-current="page" className="text-[#0E1715] max-[560px]:hidden">
            {service.name}
          </span>
        </nav>

        <Reveal>
          <p className={`${microlabel} mb-7 text-[#14352A]`}>
            <span className="text-[#C66B2D]">WizGrowth Agency</span> · Service
          </p>

          <h1 className="max-w-[22ch] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(36px,5.4vw,68px)] font-medium leading-[1.02] tracking-[-0.028em] text-[#0E1715] [font-variation-settings:'opsz'_120,'SOFT'_30]">
            {service.h1}
            {service.h1Accent && <span className="text-[#C66B2D]"> {service.h1Accent}</span>}
          </h1>

          {service.lead && (
            <p className="mt-8 max-w-[58ch] text-[17.5px] leading-[1.6] text-[rgba(14,23,21,0.62)] max-[720px]:text-[16px]">
              {service.lead}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact/"
              className="rounded-full bg-[#14352A] px-7 py-3.5 text-[14.5px] font-medium text-[#F4EEE2] transition-opacity hover:opacity-90"
            >
              Book a growth call
            </Link>
            <Link
              href="/services/"
              className="rounded-full border border-[rgba(14,23,21,0.32)] px-7 py-3.5 text-[14.5px] font-medium text-[#0E1715] transition-colors hover:border-[#0E1715]"
            >
              See all services
            </Link>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
