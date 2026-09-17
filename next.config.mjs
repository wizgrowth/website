import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibffbzwoucksfljolszp.supabase.co',
      },
    ],
    // Payload serves uploads at /api/media/... with query params (e.g. ?prefix=media).
    // Next.js 16 requires an explicit localPatterns entry when the src includes a search string.
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
      // Static images shipped in /public (founder portrait, avatars).
      {
        pathname: '/*.jpg',
      },
      {
        pathname: '/*.png',
      },
    ],
  },
  trailingSlash: true,
  // Old article URLs that Search Console still reports as 404s, plus links
  // inside articles to posts that were renamed or never written. Each goes
  // to the closest live article, or the blog index when there is none.
  async redirects() {
    const blog = (from, to) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    });
    return [
      // Requests arrive with the path still percent-encoded, so these sources
      // are written that way: %24 is "$", %20 is a space.
      { source: '/%24', destination: '/', permanent: true },
      { source: '/:dollar(\\$)', destination: '/', permanent: true },
      blog('is-seo-still-worth-it-2026', 'is-seo-still-worth-it/'),
      blog(
        'digital-marketing-institute-alappuzha-cherthala-kochi',
        'digital-marketing-course-alappuzha-cherthala-kochi/',
      ),
      blog('top-digital-marketing-companies-kochi', 'digital-marketing-company-in-kochi/'),
      blog('professional%20out%20of%20office%20message', 'out-of-office-email-marketing/'),
      blog(
        'why-digital-marketing-courses-fail-students',
        'are-digital-marketing-courses-worth-it/',
      ),
      blog('chatgpt-shows-competitor-not-you', 'how-to-get-cited-in-chatgpt/'),
      blog('schema-markup-for-ai-search', 'what-is-aeo-answer-engine-optimisation/'),
      blog('how-long-to-learn-digital-marketing', 'is-digital-marketing-a-good-career/'),
      blog(
        '%20first-freelance-digital-marketing-client',
        'first-freelance-digital-marketing-client/',
      ),
      // No live article covers these yet; the index is better than a 404.
      blog('digital-marketing-metrics', ''),
      blog('digital-marketing-metrics-that-matter', ''),
      blog('digital-marketing-strategies', ''),
      blog('traditional-vs-digital-marketing', ''),
      blog('what%20is%20digital%20marketing%20importance', ''),
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
