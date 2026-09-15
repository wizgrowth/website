import { notFound } from 'next/navigation';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import type { BlogInner } from '@/payload-types';
import {
  Breadcrumb,
  CANONICAL_ORIGIN,
  EndCta,
  Faq,
  ORG_ID,
  WA_CAREER_REVIEW,
  breadcrumbSchema,
  faqSchema,
  fromMeta,
  getPost,
  getPosts,
  postHref,
  schemaList,
} from '@/components/wg';
import { ArticleHeader, AuthorBio, Body, ProgressBar, Related, Tldr, authorOf } from './components/sections';

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
  const image = post.featuredImage && typeof post.featuredImage === 'object' ? post.featuredImage.url : null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.dek ?? post.meta?.description ?? undefined,
    ...(image ? { image: image.startsWith('http') ? image : `${CANONICAL_ORIGIN}${image}` } : {}),
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

const CAREER_CATEGORIES = new Set(['career', 'academy']);

export default async function ArticlePage({ params }: ParamsProps) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();

  const faqs = post.faqs ?? [];
  const career = (post.category ?? []).some((c) => CAREER_CATEGORIES.has(c));

  return (
    <>
      <Schema
        structuredData={schemaList(
          fromMeta(post.meta?.schema),
          breadcrumbSchema(crumbsFor(post)),
          articleSchema(post),
          faqSchema(faqs),
        )}
      />
      <ProgressBar />
      <Breadcrumb items={crumbsFor(post)} />
      <ArticleHeader post={post} />
      <Tldr post={post} />
      <Body post={post} />
      <Faq items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      <AuthorBio post={post} />
      <Related post={post} all={all} />
      {career ? (
        <EndCta
          eyebrow="Talk to us"
          heading={
            <>
              Stuck at the ₹6–8 LPA wall? Let’s <span className="fx">actually</span> look at why
            </>
          }
          body="A 30-minute call. We’ll review your portfolio and your last two case studies, and tell you the one thing to fix before your next negotiation. No pitch."
          primary={{ href: '/contact/', label: 'Book a career review' }}
          whatsapp={{ href: WA_CAREER_REVIEW, label: 'WhatsApp us' }}
        />
      ) : (
        <EndCta />
      )}
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
