import './styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { notFound } from 'next/navigation';
import type { BlogInner } from '@/payload-types';
import {
  ArticleHeader,
  AuthorBio,
  Content,
  EndCta,
  Faqs,
  ProgressBar,
  RelatedPosts,
  Tldr,
} from './components';

export const revalidate = 15552000;

const payload = await getPayload({ config });

type ParamsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ParamsProps) {
  const { slug } = await params;
  const result = await payload.find({
    collection: 'blogInner',
    where: {
      slug: { equals: slug },
    },
  });

  const blogInnerPage = result.docs?.[0];

  const metadata = await getMeta({
    meta: blogInnerPage?.meta,
    path: `/blog/${slug.trim()}/`,
    fallback: {
      title: blogInnerPage?.title ? `${blogInnerPage.title} | WizGrowth` : undefined,
      description: blogInnerPage?.dek ?? undefined,
    },
  });

  return metadata;
}

/** Merge the SEO plugin's schema with a FAQPage block built from the post's FAQs. */
function buildStructuredData(innerData: BlogInner) {
  const fromMeta = innerData?.meta?.schema;
  const base = Array.isArray(fromMeta) ? fromMeta : fromMeta ? [fromMeta] : [];

  const faqs = innerData?.faqs ?? [];
  if (faqs.length === 0) return base.length > 0 ? base : undefined;

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return [...base, faqPage];
}

export default async function BlogInnerPage({ params }: ParamsProps) {
  const { slug } = await params;

  const innerPageData = await payload.find({
    collection: 'blogInner',
    where: {
      slug: { equals: slug },
    },
    depth: 2,
  });

  const innerData = innerPageData.docs[0];
  if (!innerData) {
    notFound();
  }

  return (
    <>
      <Schema structuredData={buildStructuredData(innerData)} />
      <ProgressBar />
      <ArticleHeader innerData={innerData} />
      <Tldr innerData={innerData} />
      <Content innerData={innerData} />
      <div className="pt-20 max-[720px]:pt-14">
        <AuthorBio innerData={innerData} />
      </div>
      <Faqs innerData={innerData} />
      <RelatedPosts innerData={innerData} />
      <EndCta />
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
