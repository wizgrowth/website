import { Reveal } from '../reveal';

const WHATSAPP_HREF =
  'https://wa.me/917907551261?text=Hi%20WizGrowth%20%E2%80%94%20I%E2%80%99d%20like%20to%20talk%20about%20growing%20my%20business.';

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.06] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function EndCta() {
  return (
    <section className="pb-24 max-[720px]:pb-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <div className="rounded-3xl bg-[#14352A] p-14 text-[#F4EEE2] max-[720px]:p-8">
            <span className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
              Next step
            </span>
            <h2 className={`mt-6 max-w-[24ch] ${displayH2}`}>
              Want this run <span className="text-[#C66B2D]">for you</span>?
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-[rgba(244,238,226,0.72)]">
              A free thirty-minute growth call. We look at your numbers and tell you what we&apos;d
              fix first — no pitch deck, no obligation.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3.5">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#F4EEE2] px-7 py-3.5 text-[14.5px] font-medium text-[#0E1715] transition-opacity hover:opacity-90"
              >
                WhatsApp us
              </a>
              <a
                href="/contact/"
                className="rounded-full border border-[rgba(244,238,226,0.4)] px-7 py-3.5 text-[14.5px] font-medium text-[#F4EEE2] transition-colors hover:border-[#F4EEE2]"
              >
                Book a free growth call
              </a>
            </div>
            <p className="mt-8 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[rgba(244,238,226,0.62)]">
              Mon–Fri 9am–8pm · Sat–Sun 10am–5pm IST
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
