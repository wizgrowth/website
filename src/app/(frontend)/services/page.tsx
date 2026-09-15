import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import { Engagement, HUB_FAQS, Hero, ServicesGrid } from './components/sections';
import {
  Breadcrumb,
  EndCta,
  Faq,
  breadcrumbSchema,
  faqSchema,
  fromMeta,
  getServices,
} from './components/shared';

// Editors change service cards in the admin panel; the collection hook
// revalidates this page, and this is the safety net.
export const revalidate = 3600;

const payload = await getPayload({ config });

const servicesPageMetaData = await payload.findGlobal({ slug: 'services' });

export async function generateMetadata() {
  return getMeta({
    meta: servicesPageMetaData?.meta,
    path: '/services/',
    fallback: {
      title: 'Digital Marketing Services in Kochi, Kerala — WizGrowth',
      description:
        'SEO, AI citations, demand generation, content, social media, web development and analytics — scoped on a free growth call, targets in writing, reported monthly. Kochi, Kerala.',
    },
  });
}

const CRUMBS = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }];

export default async function ServicesPage() {
  const services = await getServices();

  const structuredData = [
    ...fromMeta(servicesPageMetaData?.meta?.schema),
    breadcrumbSchema(CRUMBS),
    faqSchema(HUB_FAQS.map((f) => ({ question: f.question, answer: f.plain }))),
  ].filter(Boolean);

  return (
    <>
      <Schema structuredData={structuredData} />
      <Breadcrumb items={CRUMBS} />
      <Hero serviceCount={services.length} />
      <ServicesGrid services={services} />
      <Engagement />
      <Faq
        heading={
          <>
            Frequently asked <span className="wg-fx">questions</span>
          </>
        }
        intro="The questions that come up on almost every first call. Ask anything else on the call itself."
        items={HUB_FAQS}
      />
      <EndCta />
    </>
  );
}
