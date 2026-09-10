import { Hero, Services, FreeConsultation } from './components';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';

const payload = await getPayload({ config });

const servicesPageMetaData = await payload.findGlobal({
  slug: 'services',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: servicesPageMetaData?.meta,
    path: '/services/',
    fallback: {
      title: 'Digital Marketing Services — SEO, Ads, Content | WizGrowth',
      description:
        'SEO, paid campaigns, content marketing, social media, web development and analytics — run as growth engines, reported against enquiries rather than impressions.',
    },
  });
  return metadata;
}

export default function ServicesPage() {
  const structuredData = servicesPageMetaData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <Hero />
      <Services />
      <FreeConsultation />
    </>
  );
}
