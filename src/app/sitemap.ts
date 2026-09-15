import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await payload.find({
    collection: 'blogInner',
    // Without this, Payload applies its default limit of 10 and the sitemap
    // silently lists only the ten most recent posts. 0 means no limit.
    limit: 0,
    depth: 0,
    sort: '-createdAt',
  })

  const blogInnerPages: MetadataRoute.Sitemap = result.docs
    // Some slugs were saved with surrounding whitespace, which produced
    // sitemap URLs containing a space that 404 for crawlers.
    .map((doc) => ({ ...doc, slug: doc.slug?.trim() }))
    .filter((doc) => Boolean(doc.slug))
    .map(({ slug, updatedAt, createdAt }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/${slug}`,
      lastModified: updatedAt || createdAt,
    }))

  const services = await payload.find({
    collection: 'servicePages',
    limit: 0,
    depth: 0,
    sort: 'order',
  })

  const servicePages: MetadataRoute.Sitemap = services.docs
    .map((doc) => ({ ...doc, slug: doc.slug?.trim() }))
    .filter((doc) => Boolean(doc.slug))
    .map(({ slug, updatedAt, createdAt }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/services/${slug}`,
      lastModified: updatedAt || createdAt,
    }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/services/` },
    // /academy/ has existed since PR #92 but was never listed here.
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/academy/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/contact/` },
  ]

  return [...staticPages, ...servicePages, ...blogInnerPages]
}
