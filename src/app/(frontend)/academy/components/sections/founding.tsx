import { Reveal } from '../reveal';

const cards = [
  {
    label: 'Smaller group',
    title: 'Capped at 20 students.',
    body: 'Future cohorts will be larger. The founding cohort stays small on purpose — peer learning works, but only at human scale.',
  },
  {
    label: 'Direct access',
    title: 'Direct line to Vismaya.',
    body: 'Beyond the bi-weekly 1:1s, founding members get direct access throughout the programme — questions, work reviews, decisions on your strategy.',
  },
  {
    label: 'Shape the curriculum',
    title: 'Your work shapes the work.',
    body: 'The curriculum is real, but the emphasis is responsive. Your business, your projects, your bottlenecks become the live material we work through.',
  },
  {
    label: 'Founding terms',
    title: 'Pricing & terms on the call.',
    body: 'Founding-member terms are discussed transparently in a 30-minute discovery call. No hidden upsells, no commitment until both sides feel the fit.',
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] text-[#F4EEE2] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Founding() {
  return (
    <section
      id="founding"
      className="relative overflow-hidden bg-[#0E1715] py-28 text-[#F4EEE2] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_50%_at_80%_30%,rgba(198,107,45,0.18),transparent_70%),radial-gradient(ellipse_60%_50%_at_10%_90%,rgba(31,77,58,0.4),transparent_70%)] max-[720px]:py-16"
    >
      <div className="relative z-[2] mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#F4EEE2]">
            <span className="text-[#C66B2D]">09</span> Founding cohort
          </span>
        </Reveal>

        <div className="mb-14 mt-4 grid grid-cols-1 items-end gap-16 max-[920px]:grid-cols-1 max-[920px]:gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className={`max-w-[14ch] ${displayH2}`}>
              Be in the <span className="text-[#C66B2D]">first 20</span>.
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-[64ch] text-[clamp(17px,1.3vw,19px)] font-normal leading-[1.55] text-[rgba(244,238,226,0.82)]">
              This is the founding cohort. The first time WizGrowth runs as a 12-week programme.
              That changes what being a student here means — smaller group than future cohorts will
              have, more direct access to Vismaya than future cohorts will get, and founding-member
              terms that won&apos;t repeat. You&apos;re not joining a finished product. You&apos;re
              shaping it.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 max-[720px]:grid-cols-1 lg:grid-cols-2">
          {cards.map((c) => (
            <Reveal key={c.label}>
              <div className="rounded-xl border border-[rgba(244,238,226,0.14)] bg-[rgba(244,238,226,0.03)] px-7 py-8 backdrop-blur-sm transition-all duration-[250ms] ease-in-out hover:border-[#C66B2D] hover:bg-[rgba(244,238,226,0.05)]">
                <div className="mb-3.5 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#C66B2D]">
                  {c.label}
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(20px,2vw,26px)] font-medium leading-[1.18] tracking-[-0.012em] text-[#F4EEE2] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                  {c.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.55] text-[rgba(244,238,226,0.78)]">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-8 border-t border-[rgba(244,238,226,0.14)] pt-10 max-[720px]:gap-5 lg:grid-cols-[1fr_auto] lg:gap-8">
          <p className="m-0 max-w-[56ch] text-[15px] leading-[1.55] text-[rgba(244,238,226,0.78)]">
            Founding cohort applications are evaluated on intent and fit, not background. Whether
            you&apos;re a founder, working marketer, freelancer, or career switcher — if WizGrowth is
            the right fit, the next step is a short conversation.
          </p>
          <a
            href="tel:+917907551261"
            className="inline-flex w-fit items-center gap-2.5 whitespace-nowrap rounded-md bg-[#C66B2D] px-[22px] py-[13px] text-[14.5px] font-medium tracking-[-0.005em] text-[#F4EEE2] transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-px hover:bg-[#D08745]"
          >
            Book a discovery call{' '}
            <span className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[17px] font-normal leading-none">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
