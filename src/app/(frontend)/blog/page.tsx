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

export default function BlogHome() {
  const structuredData = blogHomeData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <section className="mt-8 max-sm:mt-20">
        <Hero />
        <BlogList />
      </section>
    </>
  );
}
