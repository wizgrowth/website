import MeetingScheduler from '../components/sections/meeting-scheduler';
import { Hero, OurBackground } from './components';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';

const payload = await getPayload({ config });

const contactMetaData = await payload.findGlobal({
  slug: 'contact',
});

export async function generateMetadata() {
  const metadata = await getMeta({
    meta: contactMetaData?.meta,
    path: '/contact/',
    fallback: {
      title: 'Contact WizGrowth — Book a Free Growth Call',
      description:
        'Talk to WizGrowth about growing your business. WhatsApp, call or email us in Kochi, Kerala — the first step is a free thirty-minute growth call.',
    },
  });
  return metadata;
}

export default function Contact() {
  const structuredData = contactMetaData?.meta?.schema;
  return (
    <>
      <Schema structuredData={structuredData} />
      <Hero />
      <div className="mt-20">
        <MeetingScheduler />
      </div>
      <OurBackground />
    </>
  );
}
