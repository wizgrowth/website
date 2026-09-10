import './styles.css';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Hero } from './components/sections/hero';
import { Services } from './components/sections/services';
import MeetingScheduler from './components/sections/meeting-scheduler';
import { getMeta } from '../utils/get-meta';
import { Schema } from '@/components/scripts/schema';

const payload = await getPayload({ config });

const homePageData = await payload.findGlobal({
  slug: 'homepage',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: homePageData?.meta,
    path: '/',
    fallback: {
      title: 'Wizgrowth — Digital Marketing Agency in Kochi, Kerala',
      description:
        'A growth marketing agency in Kochi running SEO, paid campaigns, content, social and analytics for brands across Kerala and India. Free 30-minute growth call.',
    },
  });
  return metadata;
}

export default function HomePage() {
  const structuredData = homePageData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <section className=" bg-primary-600 antialiased">
        <Hero />
        <Services />
        <MeetingScheduler />
      </section>
    </>
  );
}
