import { Metadata } from 'next';

// Type definitions for metadata
export interface MediaSize {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  filesize?: number | null;
  filename?: string | null;
}

export interface MediaObject {
  id?: number;
  prefix?: string | null;
  alt?: string | null;
  caption?: string | Record<string, any> | null;
  updatedAt?: string;
  createdAt?: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: MediaSize;
    small?: MediaSize;
    medium?: MediaSize;
    large?: MediaSize;
    og?: MediaSize;
  };
}

export interface MetaSocial {
  id: string;
  platform: 'twitter' | 'facebook';
  ogTitle: string;
  ogDescription: string;
  ogImage: MediaObject;
}

export interface MetaData {
  title?: string | null;
  description?: string | null;
  image?: MediaObject | number | null;
  keywords?: string | null;
  metaRobots?: string | null;
  schema?: Record<string, any> | string | number | boolean | unknown[] | null;
  canonicalUrl?: string | null;
  metaSocial?: Array<{
    platform: 'twitter' | 'facebook';
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: MediaObject | number | null;
    id?: string | null;
  }> | null;
}

const DEFAULT_TITLE = 'Wizgrowth - India’s Leading Digital Marketing Agency';
const DEFAULT_DESCRIPTION =
  'Helping businesses grow through SEO, social media, content marketing, paid campaigns, website design and website development';
const DEFAULT_OG_IMAGE =
  'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/header/wizgrowth-meta-image.png';

export type MetaFallback = {
  /** Used when the CMS meta field is empty, so each page still has its own. */
  title?: string;
  description?: string;
};

export async function getMeta({
  meta,
  path,
  fallback,
}: {
  meta?: MetaData;
  /** Page path, e.g. "/services/". Used to emit a self-referencing canonical. */
  path?: string;
  fallback?: MetaFallback;
}): Promise<Metadata> {
  // Get the base URL from environment or construct it
  const baseUrl = process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://www.wizgrowth.com';

  const title = meta?.title || fallback?.title || DEFAULT_TITLE;
  const description = meta?.description || fallback?.description || DEFAULT_DESCRIPTION;
  const canonical = meta?.canonicalUrl || (path ? new URL(path, baseUrl).toString() : undefined);

  // Every page gets a canonical, an OpenGraph block and a Twitter card, even
  // when nothing is filled in the CMS. Previously these were emitted only when
  // an editor had set a canonical or an image, so in practice no page had a
  // canonical and only some blog posts had social images.
  //
  // `absolute` stops the root layout's "%s - Wizgrowth" template appending a
  // second brand suffix to titles that already carry one.
  const base: Metadata = {
    title: { absolute: title },
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
  };

  // Default meta if none provided
  if (!meta) {
    return {
      ...base,
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
        title,
        description,
        type: 'website',
        siteName: 'WizGrowth',
        ...(canonical ? { url: canonical } : {}),
        images: [{ url: DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [DEFAULT_OG_IMAGE],
      },
    };
  }

  // Find Twitter and Facebook social meta
  const twitterMeta = meta.metaSocial?.find((social) => social.platform === 'twitter');
  const facebookMeta = meta.metaSocial?.find((social) => social.platform === 'facebook');

  // Construct full image URLs
  const getFullImageUrl = (url?: string) => {
    if (!url) return undefined;
    return url.startsWith('http') ? url : `${baseUrl}${url}`;
  };

  const metadata: Metadata = { ...base };

  // Add keywords if present
  if (meta.keywords) {
    metadata.keywords = meta.keywords;
  }

  // Add robots meta if present
  if (meta.metaRobots) {
    metadata.robots = meta.metaRobots;
  }

  // OpenGraph — always emitted, falling back to the brand image.
  const facebookImage = typeof facebookMeta?.ogImage === 'object' ? facebookMeta.ogImage : null;
  const metaImage = typeof meta.image === 'object' ? meta.image : null;
  const ogImage = facebookImage || metaImage;

  metadata.openGraph = {
    title: facebookMeta?.ogTitle || title,
    description: facebookMeta?.ogDescription || description,
    type: 'website',
    siteName: 'WizGrowth',
    ...(canonical ? { url: canonical } : {}),
    images: ogImage?.url
      ? [
          {
            url: getFullImageUrl(ogImage.url) || '',
            width: ogImage.width || undefined,
            height: ogImage.height || undefined,
            alt: ogImage.alt || title,
          },
        ]
      : [{ url: DEFAULT_OG_IMAGE }],
  };

  // Twitter — always emitted, so links unfurl with a large card everywhere.
  const twitterImageObj = typeof twitterMeta?.ogImage === 'object' ? twitterMeta.ogImage : null;
  const twitterImage = twitterImageObj || metaImage;

  metadata.twitter = {
    card: 'summary_large_image',
    title: twitterMeta?.ogTitle || title,
    description: twitterMeta?.ogDescription || description,
    images: twitterImage?.url ? [getFullImageUrl(twitterImage.url) || ''] : [DEFAULT_OG_IMAGE],
  };

  return metadata;
}
