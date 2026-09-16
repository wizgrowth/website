import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  Breadcrumb,
  CANONICAL_ORIGIN,
  EndCta,
  ORG_ID,
  PostCard,
  breadcrumbSchema,
  fromMeta,
  getPosts,
  groupByCategory,
  pickFeatured,
  schemaList,
} from '@/components/wg';
import { CategoryNav, Featured, PostGrid } from './components/sections';

export const revalidate = 3600;

const payload = await getPayload({ config });
const blogHomeData = await payload.findGlobal({ slug: 'blog-home' });

export async function generateMetadata() {
  return getMeta({
    meta: blogHomeData?.meta,
    path: '/blog/',
    fallback: {
      title: 'The WizGrowth Blog — Honest Numbers & Methods',
      description:
        'Real salaries, timelines and methods from a working growth team in Kochi: the Hiring Index salary report, SEO tutorials, guides for business owners, and career reality checks.',
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

const LATEST_COUNT = 6;

export default async function BlogHome() {
  const posts = await getPosts();
  const featured = pickFeatured(posts);
  const rest = posts.filter((p) => p.id !== featured?.id);
  const latest = rest.slice(0, LATEST_COUNT);
  const sections = groupByCategory(rest);

  return (
    <>
      <Schema
        structuredData={schemaList(
          fromMeta(blogHomeData?.meta?.schema),
          breadcrumbSchema(CRUMBS),
          BLOG_SCHEMA,
        )}
      />
      <Breadcrumb items={CRUMBS} />
      <header className="shell page-hero">
        <p className="microlabel green">The WizGrowth blog</p>
        <h1>
          The numbers nobody else will <span className="fx">print</span>
        </h1>
        <p className="lead">
          Real salaries, real timelines, real methods — written by people who run campaigns, for the
          people building careers and businesses on them. Generosity is the top of our funnel.
        </p>
      </header>

      <CategoryNav sections={sections} total={posts.length} />

      {featured && <Featured post={featured} />}

      {latest.length > 0 && (
        <section className="shell section-tight" id="latest" aria-label="Latest articles">
          <div className="sec-head row" style={{ marginBottom: 28 }}>
            <div>
              <p className="microlabel green">Latest</p>
              <h2>
                Fresh from the <span className="fx">team</span>
              </h2>
            </div>
            <p className="microlabel count">{posts.length} articles · updated as we publish</p>
          </div>
          <PostGrid total={latest.length} collapsible={false}>
            {latest.map((post, i) => (
              <PostCard key={post.id} post={post} priority={i < 3} />
            ))}
          </PostGrid>
        </section>
      )}

      {sections.map((section) => (
        <section
          className="shell section-tight"
          id={`cat-${section.value.replace(/\s+/g, '-')}`}
          aria-label={section.label}
          key={section.value}
        >
          <div className="sec-head row" style={{ marginBottom: 28 }}>
            <div>
              <p className="microlabel green">{section.label}</p>
              <h2>
                {section.heading[0]}
                {section.heading[1] && <span className="fx">{section.heading[1]}</span>}
                {section.heading[2]}
              </h2>
            </div>
            <p className="microlabel count">
              {section.posts.length} {section.posts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>
          <PostGrid total={section.posts.length}>
            {section.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostGrid>
        </section>
      ))}

      <EndCta
        heading={
          <>
            Want this kind of content for your <span className="fx">brand?</span>
          </>
        }
        body="The same team writes for clients — answer-first articles built to rank and get cited."
        primary={{ href: '/services/content-marketing/', label: 'See content marketing' }}
      />
    </>
  );
}
