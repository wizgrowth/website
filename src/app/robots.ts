// robots disallowed and sitemap commented until name server is changed

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    // sitemap: `${process.env.SITE_DOMAIN}/sitemap.xml`,
  }
}
