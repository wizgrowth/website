import type { Block } from 'payload';

// Blocks available inside a blog article's rich-text body.
// Inserted from the editor's block menu, rendered by
// src/payload-components/richtext/block-convertor.tsx

export const StatCard: Block = {
  slug: 'statCard',
  interfaceName: 'StatCardBlock',
  labels: { singular: 'Stat card', plural: 'Stat cards' },
  fields: [
    {
      label: 'Figure',
      name: 'figure',
      type: 'text',
      required: true,
      admin: { description: 'The large number, e.g. "₹3.2L" or "68%".' },
    },
    {
      label: 'Body',
      name: 'body',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences explaining the figure.' },
    },
    {
      label: 'Source',
      name: 'source',
      type: 'text',
      admin: { description: 'Where the figure comes from. Shown in small caps beneath the body.' },
    },
  ],
};

export const PullQuote: Block = {
  slug: 'pullQuote',
  interfaceName: 'PullQuoteBlock',
  labels: { singular: 'Pull quote', plural: 'Pull quotes' },
  fields: [
    {
      label: 'Quote',
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      label: 'Attribution',
      name: 'attribution',
      type: 'text',
      admin: { description: 'Who said it. Leave empty for an unattributed pull quote.' },
    },
  ],
};

export const InlineCta: Block = {
  slug: 'inlineCta',
  interfaceName: 'InlineCtaBlock',
  labels: { singular: 'Inline CTA', plural: 'Inline CTAs' },
  fields: [
    {
      label: 'Label',
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'The line above the buttons, e.g. "Want this run for you?"' },
    },
    {
      label: 'WhatsApp button text',
      name: 'whatsappLabel',
      type: 'text',
      defaultValue: 'WhatsApp us',
    },
    {
      label: 'Secondary button text',
      name: 'secondaryLabel',
      type: 'text',
      defaultValue: 'Book a free growth call',
    },
    {
      label: 'Secondary button link',
      name: 'secondaryHref',
      type: 'text',
      defaultValue: '/contact/',
    },
  ],
};

export const articleBlocks = [StatCard, PullQuote, InlineCta];
