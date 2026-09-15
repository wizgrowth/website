import Link from 'next/link';
import { createElement, Fragment } from 'react';
import type { FaqItem } from '@/components/wg';
import { ACADEMY } from '@/components/wg';

// The visible answer and the schema answer are kept separately on purpose:
// the schema version is plain text and self-contained.
export const HOME_FAQS: FaqItem[] = [
  {
    question: 'What does WizGrowth do?',
    answer:
      'WizGrowth is two things run as one company. The agency side runs SEO, performance advertising, social media, content and web development for brands across India and abroad. The academy side trains marketers on that same live client work — twelve weeks, real campaigns from week two.',
  },
  {
    question: 'Do you only work with businesses in Kerala?',
    answer:
      'No. We’re based in Kochi and work with clients across India and internationally. Strategy, paid media, SEO and reporting all run remotely; we meet on video weekly and in person when it helps.',
    plain:
      'No. WizGrowth is based in Kochi and works with clients across India and internationally. Strategy, paid media, SEO and reporting all run remotely; meetings happen on video weekly and in person when it helps.',
  },
  {
    question: 'How do engagements work, and what do they cost?',
    answer: `Most agency work is a monthly retainer scoped after a free 30-minute growth call — channels, targets, budgets and timelines in writing before you commit. Academy admission is a fixed fee: ${ACADEMY.fee}, or three monthly payments.`,
    plain: `Most agency work is a monthly retainer scoped after a free 30-minute growth call — channels, targets, budgets and timelines in writing before commitment. Academy admission is a fixed fee: ${ACADEMY.fee}, or three monthly payments.`,
  },
  {
    question: 'What is AI citation optimization (GEO)?',
    answer: createElement(
      Fragment,
      null,
      'Making your brand the source AI engines name when they answer buyer questions — through entity consistency, answer-first content, original data and presence on the sources engines trust. It’s one of our three core engines: see ',
      createElement(Link, { href: '/services/ai-citations/' }, 'AI citations'),
      '.',
    ),
    plain:
      'AI citation optimization (GEO) is making a brand the source AI engines like ChatGPT, Perplexity and Google AI Overviews name when answering buyer questions — through entity consistency, answer-first content, original data and third-party presence.',
  },
  {
    question: 'What’s the difference between WizGrowth Agency and WizGrowth Academy?',
    answer:
      'The agency grows client brands. The academy grows the people who can do that work — taught from the agency’s live campaigns, not recycled theory. Each side is proof of the other.',
  },
  {
    question: 'How long until SEO or paid ads show results?',
    answer:
      'Paid campaigns produce data within days and usable lead flow in two to six weeks. SEO compounds more slowly: early movement in six to eight weeks, meaningful traffic in three to six months, depending on where your site starts. Anyone promising page one in a week is guessing.',
    plain:
      'Paid campaigns produce data within days and usable lead flow in two to six weeks. SEO compounds more slowly: early movement in six to eight weeks, meaningful traffic in three to six months, depending on where the site starts.',
  },
];
