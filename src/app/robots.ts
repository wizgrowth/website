// robots disallowed and sitemap commented until name server is changed

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  if (
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_SITE_DOMAIN === 'https://wizgrowth-staging.vercel.app'
  ) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/sitemap.xml`,
  }
}
