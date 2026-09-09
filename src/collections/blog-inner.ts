import type { CollectionConfig } from 'payload';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { articleBlocks } from './blocks/article-blocks';

export const BlogInner: CollectionConfig = {
  slug: 'blogInner',
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Slug',
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      label: 'Title',
      name: 'title',
      type: 'text',
    },
    {
      label: 'Standfirst',
      name: 'dek',
      type: 'textarea',
      admin: {
        description:
          'The short paragraph under the headline that sets up the article. Two or three sentences.',
      },
    },
    {
      label: 'Breadcrumb Label',
      name: 'crumb',
      type: 'text',
      admin: {
        description:
          'Short label for the breadcrumb trail, e.g. "What is AEO?". Falls back to the title if empty.',
      },
    },
    {
      label: 'Published Date',
      name: 'publishedDate',
      type: 'date',
      admin: {
        description:
          'The date shown on the article and used for sorting. Falls back to the created date if empty.',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
      },
    },
    {
      label: 'Featured Image',
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      label: 'Category',
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'General',
          value: 'general',
        },
        {
          label: 'Best Of',
          value: 'best of',
        },
        {
          label: 'AI',
          value: 'ai',
        },
        // Added with the article revamp. The three values above are kept so the
        // existing posts that use them keep rendering.
        {
          label: 'Career',
          value: 'career',
        },
        {
          label: 'SEO & Content',
          value: 'seo-content',
        },
        {
          label: 'Tools',
          value: 'tools',
        },
        {
          label: 'Local Business',
          value: 'local-business',
        },
        {
          label: 'Academy',
          value: 'academy',
        },
      ],
    },
    {
      label: 'Reading Time',
      name: 'readingTime',
      type: 'text',
    },
    {
      label: 'Side Menu',
      name: 'sideMenu',
      type: 'array',
      interfaceName: 'SideMenu',
      fields: [
        {
          label: 'Title Id',
          name: 'titleId',
          type: 'text',
        },
        {
          label: 'Title',
          name: 'title',
          type: 'text',
        },
      ],
    },
    {
      label: 'TL;DR',
      name: 'tldr',
      type: 'array',
      interfaceName: 'ArticleTldr',
      admin: {
        description:
          'The summary box above the article. Three to five points. Leave empty to hide the box.',
      },
      fields: [
        {
          label: 'Lead-in',
          name: 'label',
          type: 'text',
          admin: { description: 'Bolded opening, e.g. "What AEO is:". Optional.' },
        },
        {
          label: 'Point',
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ blocks: articleBlocks }),
        ],
      }),
    },
    {
      label: 'FAQs',
      name: 'faqs',
      type: 'array',
      interfaceName: 'ArticleFaqs',
      admin: {
        description:
          'Shown as an expandable list under the article, and used to build FAQPage structured data. Leave empty to hide the section.',
      },
      fields: [
        {
          label: 'Question',
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          label: 'Answer',
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      label: 'Related Articles',
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'blogInner',
      hasMany: true,
      maxRows: 3,
      admin: {
        description: 'Up to three articles shown at the end of this one.',
      },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    {
      name: 'publishedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
    },
  ],
  // admin: {readonly:true} - This property makes the particular field readOnly to admins and users by payload
  // used hooks to add publishedby and updatedby data
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create') {
          if (req.user) {
            data.publishedBy = req.user.id;
          }
        }
        if (operation === 'update') {
          if (req.user) {
            data.updatedBy = req.user.id;
          }
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc }) => {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path: `/blog/${doc.slug}` }),
            },
          );
        } catch (err) {
          console.error('Revalidation failed:', err);
        }
      },
    ],
  },
};
