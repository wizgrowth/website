import type { CollectionConfig } from 'payload';
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import { articleBlocks } from './blocks/article-blocks';
import { revalidatePaths } from '@/lib/revalidate';

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
        {
          label: 'For Business Owners',
          value: 'business-owners',
        },
      ],
    },
    {
      label: 'Hide from sitemap',
      name: 'hideFromSitemap',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Leave this article out of sitemap.xml. The page itself stays online; untick to list it again.',
      },
    },
    {
      label: 'Featured on the blog index',
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Shows this article in the dark featured card at the top of /blog/. Only the most recent featured article is used.',
      },
    },
    {
      label: 'Featured Label',
      name: 'featuredLabel',
      type: 'text',
      admin: {
        condition: (data) => Boolean(data?.featured),
        description:
          'Small label above the featured title, e.g. "Featured · The WizGrowth Hiring Index".',
      },
    },
    {
      label: 'Featured Stat',
      name: 'featuredStat',
      type: 'text',
      admin: {
        condition: (data) => Boolean(data?.featured),
        description: 'The big number on the featured card, e.g. "₹22K". Optional.',
      },
    },
    {
      label: 'Featured Stat Caption',
      name: 'featuredStatCaption',
      type: 'text',
      admin: {
        condition: (data) => Boolean(data?.featured),
        description: 'What the number is, e.g. "median fresher salary · 1,200+ listings sampled".',
      },
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
        // Slugs saved with surrounding whitespace produced URLs like
        // /blog/%20some-post, which 404 and were being fed to Google.
        if (typeof data.slug === 'string') {
          data.slug = data.slug.trim();
        }
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
        // The article itself, the blog index that lists it, and the home
        // page's latest-articles row.
        await revalidatePaths([`/blog/${doc.slug}`, '/blog', '/', '/sitemap.xml']);
      },
    ],
  },
};
