import { getPayload } from 'payload';
import config from '@payload-config';
import { Hero, BlogList } from './components';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';

export const revalidate = 60;

const payload = await getPayload({ config });

const blogHomeData = await payload.findGlobal({
  slug: 'blog-home',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: blogHomeData?.meta,
  });
  return metadata;
}
const blogHeroData = await payload.find({
  collection: 'blogInner',
  depth: 2,
  limit: 1, // limit to 1 item
  sort: '-createdAt', // sort by most recent
  select: {
    title: true,
    slug: true,
    category: true,
    readingTime: true,
    publishedBy: true,
    featuredImage: true,
  },
});

export default function BlogHome() {
  const structuredData = blogHomeData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <section className="mt-40">
        <Hero innerData={blogHeroData.docs[0]} />
        <BlogList />
      </section>
    </>
  );
}
