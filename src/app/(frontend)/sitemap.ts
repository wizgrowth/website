import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await payload.find({
    collection: 'blogInner',
  })

  const blogInnerPages: MetadataRoute.Sitemap = result.docs.map(({ slug, createdAt }) => {
    return {
      url: `${process.env.SITE_DOMAIN}/blog/${slug}`,
      lastModified: createdAt,
    }
  })

  return [
    {
      url: `${process.env.SITE_DOMAIN}`,
    },
    {
      url: `${process.env.SITE_DOMAIN}/blog/`,
    },
    {
      url: `${process.env.SITE_DOMAIN}/contact/`,
    },
    {
      url: `${process.env.SITE_DOMAIN}/services/`,
    },
    ...blogInnerPages,
  ]
}
