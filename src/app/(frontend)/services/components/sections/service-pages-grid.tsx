import Link from 'next/link';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { getPayload } from 'payload';
import config from '@payload-config';

// The services hub does not load the brand fonts, so this section brings its own.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
});
const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

// Links the individual service pages from the services hub. Without this the
// pages exist but nothing on the site points at them.
export async function ServicePagesGrid() {
  let services: { slug: string; name: string; card?: string | null; cardCta?: string | null }[] =
    [];

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'servicePages',
      limit: 0,
      depth: 0,
      sort: 'order',
    });
    services = result.docs;
  } catch {
    return null;
  }

  if (services.length === 0) return null;

  return (
    <section
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} bg-[#F4EEE2] py-24 text-[#0E1715] antialiased [font-family:var(--font-geist-sans),ui-sans-serif,system-ui,sans-serif] max-[720px]:py-16`}
      id="what-we-do"
    >
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
          <span className="text-[#C66B2D]">Services</span> What we run
        </span>

        <h2 className="mt-7 max-w-[20ch] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.06] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]">
          Every engine we run, <span className="text-[#C66B2D]">in detail</span>.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="flex h-full flex-col gap-4 rounded-2xl border border-[rgba(14,23,21,0.16)] p-7 transition-colors hover:border-[rgba(14,23,21,0.4)]"
            >
              <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[22px] font-medium leading-[1.2] tracking-[-0.015em] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                {service.name}
              </span>
              {service.card && (
                <span className="text-[15px] leading-[1.6] text-[rgba(14,23,21,0.62)]">
                  {service.card}
                </span>
              )}
              <span className="mt-auto font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
                {service.cardCta || 'Learn more'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
