// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Homepage } from './collections/homepage';
import { Services } from './collections/services';
import { BlogInner } from './collections/blog-inner';
import { Contact } from './collections/contact';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { DemoBooking } from './collections/Demo-booking';
import { BlogHome } from './collections/blog-home';
import { s3Storage } from '@payloadcms/storage-s3';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Determine if S3 storage plugin should be enabled (only for local development)
const isLocalHost = process.env.ISLOCALHOST === 'true';
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // 🌟 ADD CORS HERE
  cors: ['http://localhost:3000', '*.vercel.app', 'https://www.wizgrowth.com'],
  // 🌟 END CORS

  collections: [Users, Media, DemoBooking, BlogInner],
  globals: [Contact, Homepage, Services, BlogHome],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),

    seoPlugin({
      collections: ['blogInner'],
      globals: ['homepage', 'contact', 'services', 'blog-home'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.plainText,
      generateImage: ({ doc }) => doc?.image,
      generateURL: ({ doc, collectionSlug }) =>
        `https://example.com/${collectionSlug}/${doc?.slug}`,
      tabbedUI: true,
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'keywords',
          label: 'Keywords',
          type: 'text',
        },
        {
          name: 'metaRobots',
          label: 'Meta Robots',
          type: 'text',
        },
        {
          name: 'schema',
          label: 'Schema',
          type: 'json',
        },
        {
          name: 'canonicalUrl',
          label: 'Canonical URL',
          type: 'text',
        },
        {
          name: 'metaSocial',
          label: 'Meta Social',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            {
              labal: 'Platform',
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Twitter', value: 'twitter' },
              ],
            },

            {
              label: 'Title',
              name: 'ogTitle',
              type: 'text',
            },
            {
              label: 'Description',
              name: 'ogDescription',
              type: 'textarea',
            },
            {
              label: 'Image',
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    }),

    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: `${process.env.S3_BUCKET || ''}`,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: `${process.env.S3_ACCESS_KEY_ID || ''}`,
          secretAccessKey: `${process.env.S3_SECRET_ACCESS_KEY || ''}`,
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
      },
      enabled: !isLocalHost,
    }),
  ],
});
