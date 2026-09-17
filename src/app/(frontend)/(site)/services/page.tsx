import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  Breadcrumb,
  EndCta,
  Faq,
  ServiceCard,
  breadcrumbSchema,
  faqPlain,
  faqSchema,
  fromMeta,
  getServices,
  schemaList,
} from '@/components/wg';
import { Engagement, SERVICES_FAQS } from './components/sections';

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
        'SEO, AI citations (GEO), demand generation, content, social media, web development and analytics — scoped on a free growth call, targets in writing, reported monthly.',
    },
  });
}

const CRUMBS = [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }];
const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export default async function ServicesPage() {
  const services = await getServices();
  const count = WORDS[services.length] ?? String(services.length);

  const structuredData = schemaList(
    fromMeta(servicesPageMetaData?.meta?.schema),
    breadcrumbSchema(CRUMBS),
    faqSchema(SERVICES_FAQS.map((f) => ({ question: f.question, answer: faqPlain(f) }))),
  );

  return (
    <>
      <Schema structuredData={structuredData} />
      <Breadcrumb items={CRUMBS} />
      <header className="shell page-hero">
        <p className="microlabel green">WizGrowth Agency</p>
        <h1>
          {count} services. One rule: numbers you can <span className="fx">check</span>
        </h1>
        <p className="lead">
          Pick a channel or bring us the goal — either way, every engagement starts with a free
          growth call and a written scope, and reports monthly against targets you agreed to.
          Misses included.
        </p>
      </header>
      <section className="shell section-tight" aria-label="Services">
        <div className="svc-grid">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
      <Engagement />
      <Faq items={SERVICES_FAQS} />
      <EndCta />
    </>
  );
}
