import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  CANONICAL_ORIGIN,
  ORG_ID,
  breadcrumbSchema,
  cardData,
  fromMeta,
  getPosts,
  pickFeatured,
  schemaList,
  topicCounts,
} from '@/components/wg';
import { BottomCta, JournalHub, Picks, Spotlight } from './components/sections';

export const revalidate = 3600;

const payload = await getPayload({ config });
const blogHomeData = await payload.findGlobal({ slug: 'blog-home' });

export async function generateMetadata() {
  return getMeta({
    meta: blogHomeData?.meta,
    path: '/blog/',
    fallback: {
      title: 'The WizGrowth Blog — Good ideas. Clearer growth.',
      description:
        'Practical thinking on search, content, careers and websites from a working growth team in Kochi: salary reports, SEO guides and honest methods.',
    },
  });
}

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog/' },
];

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  url: `${CANONICAL_ORIGIN}/blog/`,
  name: 'The WizGrowth Blog',
  publisher: { '@id': ORG_ID },
};

export default async function BlogHome() {
  const posts = await getPosts();
  const spotlight = pickFeatured(posts);
  const picks = posts.filter((p) => p.id !== spotlight?.id).slice(0, 2);

  return (
    <>
      <Schema
        structuredData={schemaList(
          fromMeta(blogHomeData?.meta?.schema),
          breadcrumbSchema(CRUMBS),
          BLOG_SCHEMA,
        )}
      />
      <section className="wg-journal-intro">
        <div className="shell">
          <nav className="wg-crumb" aria-label="Breadcrumb">
            {/* Plain anchor: the home page is the other half of the site. */}
            <a href="/">Home</a>
            <span>/</span>
            <span aria-current="page">Blog</span>
          </nav>
          <span className="j-label">THE WIZGROWTH JOURNAL</span>
          <h1>
            Good ideas.
            <br className="wg-mobile-break" /> <span>Clearer growth.</span>
          </h1>
          <p>
            Practical thinking on search, content and websites.
            <br />
            For the next step your business needs.
          </p>
        </div>
      </section>

      <JournalHub items={posts.map(cardData)} topics={topicCounts(posts)}>
        {spotlight && <Spotlight post={spotlight} />}
        <Picks posts={picks} />
      </JournalHub>

      <BottomCta />
    </>
  );
}
