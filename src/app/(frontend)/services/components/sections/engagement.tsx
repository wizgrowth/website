export const ENGAGEMENT_STEPS = [
  {
    label: 'A free 30-minute growth call.',
    text: 'We look at your numbers and tell you what we’d fix first — useful even if you never hire us.',
  },
  {
    label: 'A written scope.',
    text: 'Channels, targets, budgets, timelines. You see the plan before you pay for it.',
  },
  {
    label: 'Work, reported monthly.',
    text: 'One dashboard, a monthly call, and the misses named alongside the wins.',
  },
  {
    label: 'Stay because it works.',
    text: 'No long lock-ins — engagements continue on results, not contracts.',
  },
];

export function Engagement() {
  return (
    <section className="shell section-tight prose" aria-label="How engagements work">
      <h2>
        How an engagement <span className="fx">starts</span>
      </h2>
      <ol className="steps">
        {ENGAGEMENT_STEPS.map((step) => (
          <li key={step.label}>
            <b>{step.label}</b>
            {step.text}
          </li>
        ))}
      </ol>
    </section>
  );
}
