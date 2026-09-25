import { MetadataRoute } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { RETIRED_SERVICES, serviceHref } from '@/components/wg/services-data';

// Refreshed hourly and on every article or service save, so new pages
// appear without a redeploy.
export const revalidate = 3600;

const payload = await getPayload({ config });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await payload.find({
    collection: 'blogInner',
    // Without this, Payload applies its default limit of 10 and the sitemap
    // silently lists only the ten most recent posts. 0 means no limit.
    limit: 0,
    depth: 0,
    sort: '-createdAt',
    select: { slug: true, updatedAt: true, createdAt: true, hideFromSitemap: true },
  });

  const blogInnerPages: MetadataRoute.Sitemap = result.docs
    // Editors can hide an article from the sitemap in the admin panel.
    .filter((doc) => !doc.hideFromSitemap)
    // Some slugs were saved with surrounding whitespace, which produced
    // sitemap URLs containing a space that 404 for crawlers.
    .map((doc) => ({ ...doc, slug: doc.slug?.trim() }))
    .filter((doc) => Boolean(doc.slug))
    .map(({ slug, updatedAt, createdAt }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/${slug}/`,
      lastModified: updatedAt || createdAt,
    }));

  // The sitemap is generated at build time; if the services table is not
  // there yet (schema behind the code), list the static pages and posts only.
  const services = await payload
    .find({
      collection: 'servicePages',
      limit: 0,
      depth: 0,
      sort: 'order',
      select: { slug: true, updatedAt: true, createdAt: true },
    })
    .catch((err: unknown) => {
      console.error('[sitemap] servicePages query failed:', err);
      return { docs: [] as { slug?: string | null; updatedAt?: string; createdAt?: string }[] };
    });

  const servicePages: MetadataRoute.Sitemap = services.docs
    .map((doc) => ({ ...doc, slug: doc.slug?.trim() }))
    .filter((doc) => Boolean(doc.slug) && !RETIRED_SERVICES.has(doc.slug!))
    .map(({ slug, updatedAt, createdAt }) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}${serviceHref(slug!)}`,
      lastModified: updatedAt || createdAt,
    }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/blog/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/services/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/services/marketing-consultation/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/academy/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/academy/digital-marketing-course/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/academy/advanced-digital-marketing-mentorship/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/academy/digital-marketing-for-business-owners/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/work/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/about/` },
    { url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/contact/` },
  ];

  return [...staticPages, ...servicePages, ...blogInnerPages];
}
