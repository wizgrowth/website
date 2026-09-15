import type { FaqItem } from '../shared';

export const HUB_STEPS = [
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

export const HUB_FAQS: (FaqItem & { plain: string })[] = [
  {
    question: 'How do WizGrowth engagements work?',
    plain:
      'A free 30-minute growth call, then a written scope with channels, targets, budgets and timelines; monthly reporting follows, misses included.',
    answer:
      'A free 30-minute growth call, then a written scope with channels, targets, budgets and timelines. Work starts only after you’ve seen the plan — and reporting is monthly, misses included.',
  },
  {
    question: 'What do services cost?',
    plain:
      'Each service is a monthly retainer scoped to the client’s market and goals on a free growth call, with numbers put in writing before commitment.',
    answer:
      'Each service is a monthly retainer scoped to your market and goals on the growth call. We put numbers in writing before you commit; there’s no rate card that pretends every business is the same.',
  },
  {
    question: 'Do you work with clients outside Kerala?',
    plain:
      'Yes. WizGrowth is based in Kochi and runs engagements across India and internationally, working remotely with weekly video calls.',
    answer:
      'Yes — we’re based in Kochi and run engagements across India and internationally. Everything runs remotely with weekly video calls; in person when it helps.',
  },
  {
    question: 'Can we start with one service and add more later?',
    plain:
      'Yes. Most clients start with one channel and add others once the first is reporting well; scope changes are agreed in writing.',
    answer:
      'Yes. Most clients start with the one channel that matters most and add others once the first is reporting well. Every change of scope is agreed in writing, the same way the first one was.',
  },
];

const WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
];

/** "Seven" for 7; falls back to the digits past twelve. */
export function countWord(n: number) {
  return WORDS[n] ?? String(n);
}
