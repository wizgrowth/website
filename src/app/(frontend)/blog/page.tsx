import { getPayload } from 'payload';
import config from '@payload-config';
import { Hero, BlogList } from './components';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';

const payload = await getPayload({ config });

const blogHomeData = await payload.findGlobal({
  slug: 'blog-home',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: blogHomeData?.meta,
    path: '/blog/',
    fallback: {
      title: 'Digital Marketing Blog — SEO, Careers & Growth | WizGrowth',
      description:
        'Practical writing on SEO, digital marketing careers and growing a business in Kerala — from an operator running these campaigns daily.',
    },
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
