import { Metadata } from 'next'

// Type definitions for metadata
export interface MediaSize {
  url?: string | null
  width?: number | null
  height?: number | null
  mimeType?: string | null
  filesize?: number | null
  filename?: string | null
}

export interface MediaObject {
  id?: number
  prefix?: string | null
  alt?: string | null
  caption?: string | Record<string, any> | null
  updatedAt?: string
  createdAt?: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
  sizes?: {
    thumbnail?: MediaSize
    small?: MediaSize
    medium?: MediaSize
    large?: MediaSize
    og?: MediaSize
  }
}

export interface MetaSocial {
  id: string
  platform: 'twitter' | 'facebook'
  ogTitle: string
  ogDescription: string
  ogImage: MediaObject
}

export interface MetaData {
  title?: string | null
  description?: string | null
  image?: MediaObject | number | null
  keywords?: string | null
  metaRobots?: string | null
  schema?: Record<string, any> | string | number | boolean | unknown[] | null
  canonicalUrl?: string | null
  metaSocial?: Array<{
    platform: 'twitter' | 'facebook'
    ogTitle?: string | null
    ogDescription?: string | null
    ogImage?: MediaObject | number | null
    id?: string | null
  }> | null
}

export async function getMeta({ meta }: { meta?: MetaData }): Promise<Metadata> {
  // Get the base URL from environment or construct it
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Default meta if none provided
  if (!meta) {
    return {
      title: 'Wizgrowth - India’s Leading Digital Marketing Agency',
      description:
        'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
      keywords: [
        'Wizgrowth',
        'Digital Marketing',
        'SEO',
        'Social Media',
        'Content Marketing',
        'Paid Campaigns',
        'Website Design',
        'Website Development',
      ],
      openGraph: {
        title: 'Wizgrowth - India’s Leading Digital Marketing Agency',
        description:
          'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
        images: [
          {
            url: 'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/header/wizgrowth-meta-image.png',
          },
        ],
      },
    }
  }

  // Find Twitter and Facebook social meta
  const twitterMeta = meta.metaSocial?.find((social) => social.platform === 'twitter')
  const facebookMeta = meta.metaSocial?.find((social) => social.platform === 'facebook')

  // Construct full image URLs
  const getFullImageUrl = (url?: string) => {
    if (!url) return undefined
    return url.startsWith('http') ? url : `${baseUrl}${url}`
  }

  const metadata: Metadata = {
    title: meta.title || 'Wizgrowth - India’s Leading Digital Marketing Agency',
    description:
      meta.description ||
      'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
  }

  // Add keywords if present
  if (meta.keywords) {
    metadata.keywords = meta.keywords
  }

  // Add robots meta if present
  if (meta.metaRobots) {
    metadata.robots = meta.metaRobots
  }

  // Add canonical URL if present
  if (meta.canonicalUrl) {
    metadata.alternates = {
      canonical: meta.canonicalUrl,
    }
  }

  // Add OpenGraph metadata
  if (facebookMeta || meta.image) {
    const facebookImage = typeof facebookMeta?.ogImage === 'object' ? facebookMeta.ogImage : null
    const metaImage = typeof meta.image === 'object' ? meta.image : null
    const ogImage = facebookImage || metaImage

    metadata.openGraph = {
      title:
        facebookMeta?.ogTitle ||
        meta.title ||
        'Wizgrowth - India’s Leading Digital Marketing Agency',
      description:
        facebookMeta?.ogDescription ||
        meta.description ||
        'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
      images: ogImage?.url
        ? [
            {
              url: getFullImageUrl(ogImage.url) || '',
              width: ogImage.width || undefined,
              height: ogImage.height || undefined,
              alt: ogImage.alt || meta.title || 'Wizgrowth',
            },
          ]
        : undefined,
    }
  }

  // Add Twitter metadata
  if (twitterMeta || meta.image) {
    const twitterImageObj = typeof twitterMeta?.ogImage === 'object' ? twitterMeta.ogImage : null
    const metaImage = typeof meta.image === 'object' ? meta.image : null
    const twitterImage = twitterImageObj || metaImage

    metadata.twitter = {
      card: 'summary_large_image',
      title:
        twitterMeta?.ogTitle ||
        meta.title ||
        'Wizgrowth - India’s Leading Digital Marketing Agency',
      description:
        twitterMeta?.ogDescription ||
        meta.description ||
        'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development',
      images: twitterImage?.url ? [getFullImageUrl(twitterImage.url) || ''] : undefined,
    }
  }

  return metadata
}
