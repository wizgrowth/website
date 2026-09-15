import type { CollectionConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

// One document per service page, rendered at /services/<slug>/.
// A collection rather than a global per page, so new services can be added
// from the admin panel without a migration and a deploy.
export const ServicePages: CollectionConfig = {
  slug: 'servicePages',
  labels: { singular: 'Service Page', plural: 'Service Pages' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Short label used in the services grid, nav and footer.' },
    },
    {
      label: 'Slug',
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'The URL segment, e.g. "seo" becomes /services/seo/.' },
    },
    {
      label: 'Order',
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first in the services grid.' },
    },
    {
      label: 'Headline',
      name: 'h1',
      type: 'text',
      required: true,
      admin: { description: 'The page heading, without the highlighted words.' },
    },
    {
      label: 'Headline Highlight',
      name: 'h1Accent',
      type: 'text',
      admin: {
        description: 'The closing words of the headline, shown in the accent colour.',
      },
    },
    {
      label: 'Lead',
      name: 'lead',
      type: 'textarea',
      admin: { description: 'The standfirst under the headline.' },
    },
    {
      label: 'Card Text',
      name: 'card',
      type: 'textarea',
      admin: { description: 'The summary shown on the /services/ grid.' },
    },
    {
      label: 'Card Link Text',
      name: 'cardCta',
      type: 'text',
      defaultValue: 'Learn more',
    },
    {
      label: 'How We Run It',
      name: 'steps',
      type: 'array',
      interfaceName: 'ServiceSteps',
      fields: [
        { label: 'Step', name: 'label', type: 'text', required: true },
        { label: 'Detail', name: 'text', type: 'textarea', required: true },
      ],
    },
    {
      label: "What's Included",
      name: 'includes',
      type: 'array',
      interfaceName: 'ServiceIncludes',
      fields: [{ label: 'Item', name: 'item', type: 'text', required: true }],
    },
    {
      label: 'Timelines, Pricing, Honesty',
      name: 'honesty',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      label: 'FAQs',
      name: 'faqs',
      type: 'array',
      interfaceName: 'ServiceFaqs',
      admin: {
        description: 'Shown as boxes at the foot of the page and used for FAQPage schema.',
      },
      fields: [
        { label: 'Question', name: 'question', type: 'text', required: true },
        { label: 'Answer', name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (typeof data.slug === 'string') {
          data.slug = data.slug.trim();
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc }) => {
        // The hub lists every service's card, so it goes stale too.
        const paths = [`/services/${doc.slug}`, '/services'];
        for (const path of paths) {
          try {
            await fetch(
              `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path }),
              },
            );
          } catch (err) {
            console.error('Revalidation failed:', err);
          }
        }
      },
    ],
  },
};
