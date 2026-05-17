import './../styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { Hero } from './components/sections';

const payload = await getPayload({ config });

const academyPageData = await payload.findGlobal({
  slug: 'academy',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: academyPageData?.meta,
  });
  return metadata;
}

export default function AcademyPage() {
  const structuredData = academyPageData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <section className=" bg-primary-600 antialiased">
        <Hero />
      </section>
    </>
  );
}
