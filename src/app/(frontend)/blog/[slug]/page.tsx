import { Hero, Content } from './components';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { notFound } from 'next/navigation';

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
  });

  return metadata;
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
      <Schema
        structuredData={innerData?.meta?.schema === null ? undefined : innerData?.meta?.schema}
      />
      <Hero innerData={innerData} />
      <Content innerData={innerData} />
    </>
  );
}
