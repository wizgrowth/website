import { notFound } from 'next/navigation';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import type { BlogInner } from '@/payload-types';
import {
  CANONICAL_ORIGIN,
  ORG_ID,
  breadcrumbSchema,
  coverOf,
  faqSchema,
  fromMeta,
  getPost,
  getPosts,
  postHref,
  schemaList,
} from '@/components/wg';
import { extractHeadings } from '@/payload-components/richtext/headings';
import { EnquiryButton } from '../components/sections';
import {
  Banner,
  Prose,
  ReadingRail,
  Related,
  authorOf,
  offerFor,
  type ArticleContent,
} from './components/sections';

export const revalidate = 3600;

type ParamsProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ParamsProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  return getMeta({
    meta: post?.meta,
    path: `/blog/${slug.trim()}/`,
    fallback: {
      title: post?.title ? `${post.title} — WizGrowth` : undefined,
      description: post?.dek ?? undefined,
    },
  });
}

function crumbsFor(post: BlogInner) {
  return [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: post.crumb || post.title || 'Article', href: postHref(post) },
  ];
}

function articleSchema(post: BlogInner) {
  const author = authorOf(post);
  const cover = coverOf(post);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.dek ?? post.meta?.description ?? undefined,
    image: cover.src.startsWith('http') ? cover.src : `${CANONICAL_ORIGIN}${cover.src}`,
    datePublished: post.publishedDate ?? post.createdAt,
    dateModified: post.updatedAt,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          ...(author.designation ? { jobTitle: author.designation } : {}),
          url: `${CANONICAL_ORIGIN}/about/`,
        }
      : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${CANONICAL_ORIGIN}${postHref(post)}` },
  };
}

export default async function ArticlePage({ params }: ParamsProps) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const content = post.content as ArticleContent;
  const headings = extractHeadings(content);
  const faqs = post.faqs ?? [];
  const offer = offerFor(post);

  // Editors can paste structured data into the SEO tab. When that already
  // holds an Article or FAQPage node, the page must not emit a second one.
  const fromEditor = fromMeta(post.meta?.schema);
  const editorHas = (type: string) =>
    fromEditor.some((item) => {
      const t = (item as { '@type'?: unknown })['@type'];
      return Array.isArray(t) ? t.includes(type) : t === type;
    });

  return (
    <>
      <Schema
        structuredData={schemaList(
          fromEditor,
          breadcrumbSchema(crumbsFor(post)),
          editorHas('Article') ? null : articleSchema(post),
          editorHas('FAQPage') ? null : faqSchema(faqs),
        )}
      />
      <Banner post={post} headings={headings} />
      <div className="shell j-reading">
        <ReadingRail headings={headings} slug={post.slug}>
          <div className="wg-article-rail">
            <span className="j-label">MAKE IT YOUR NEXT STEP</span>
            <h3>Good ideas work better in practice.</h3>
            <p>Tell us what you want to improve.</p>
            <EnquiryButton label={offer.label} goal={offer.goal} source={post.slug} />
          </div>
        </ReadingRail>
        <Prose post={post} content={content} />
      </div>
      <Related post={post} all={all} />
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
