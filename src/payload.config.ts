// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Homepage } from './collections/homepage'
import { Services } from './collections/services'
import { BlogInner } from './collections/blog-inner'
import { Contact } from './collections/contact'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { DemoBooking } from './collections/Demo-booking'
import { BlogHome } from './collections/blog-home'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
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
    // storage-adapter-placeholder
    seoPlugin({
      collections: ['blogInner'], //slug of the collection type
      globals: ['homepage', 'contact', 'services', 'blog-home'], //slug of the global type
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => doc.title,
      generateDescription: ({ doc }) => doc.plainText,
      generateURL: ({ doc, collectionSlug }) =>
        `https://example.com/${collectionSlug}/${doc?.slug}`,
      tabbedUI: true,
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          label: 'Open Graph Title',
          name: 'ogTitle',
          type: 'text',
        },
        {
          label: 'Open Graph Description',
          name: 'ogDescription',
          type: 'textarea',
        },
        {
          label: 'Open Graph Image',
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: `${process.env.S3_BUCKET}`,
      config: {
        forcePathStyle: true, // Important for using Supabase
        credentials: {
          accessKeyId: `${process.env.S3_ACCESS_KEY_ID}`,
          secretAccessKey: `${process.env.S3_SECRET_ACCESS_KEY}`,
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
})
