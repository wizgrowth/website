import { Reveal } from '../reveal';

const audience = [
  {
    role: 'Founders',
    text: 'Building your first marketing engine. You need to know what to do, what to delegate, and what to defund.',
  },
  {
    role: 'Working marketers',
    text: 'Moving from execution into strategy, growth, or product-marketing roles at SaaS and consumer companies.',
  },
  {
    role: 'Freelancers',
    text: 'Levelling up from "social media manager" rates to senior retainers and growth-consultant pricing.',
  },
  {
    role: 'Agency operators',
    text: 'Owners and team leads upgrading their bench with frameworks, experimentation, and AI-native workflows.',
  },
  {
    role: 'Ambitious students',
    text: 'Skipping the dead-end "digital marketing executive" track and aiming straight at growth-marketer roles.',
  },
  {
    role: 'Career switchers',
    text: 'Coming in from product, sales, design, or engineering — and looking for a real ramp into growth.',
  },
] as const;

const displayH2 =
  "font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.04] tracking-[-0.025em] [font-variation-settings:'opsz'_96,'SOFT'_30]";

export function Audience() {
  return (
    <section className="py-28 text-[#0E1715] max-[720px]:py-16">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A]">
            <span className="text-[#C66B2D]">08</span> Built for
          </span>
          <h2 className={`mt-3.5 max-w-[22ch] ${displayH2}`}>
            Built for people who want to <span className="text-[#C66B2D]">operate</span>, not just
            attend.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px border-t border-[rgba(14,23,21,0.32)] bg-[rgba(14,23,21,0.12)] max-[720px]:grid-cols-1 lg:grid-cols-3">
          {audience.map((a) => (
            <Reveal key={a.role} className="bg-[#F4EEE2] px-0 py-8 max-[720px]:px-0 max-[720px]:py-6 lg:px-7 lg:py-8">
              <div className="font-[family-name:var(--font-fraunces),Georgia,serif] text-2xl font-medium leading-[1.15] tracking-[-0.018em] text-[#0E1715]">
                {a.role}
              </div>
              <p className="mt-2 text-[14.5px] leading-[1.5] text-[rgba(14,23,21,0.62)]">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
