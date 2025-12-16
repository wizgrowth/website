import { Hero, Content } from './components';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';

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

// fetching page data
async function getInnerPageData(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/blogInner/?where[slug][equals]=${slug}&depth=2`,
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch page data');
  }
}

export default async function BlogInnerPage({ params }: ParamsProps) {
  const { slug } = await params;
  const innerData = await getInnerPageData(slug);
  return (
    <>
      <Schema
        structuredData={
          innerData.docs[0]?.meta?.schema === null ? undefined : innerData.docs[0]?.meta?.schema
        }
      />
      <Hero innerData={innerData.docs[0]} />
      <Content innerData={innerData.docs[0]} />
    </>
  );
}
