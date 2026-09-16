import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  EndCta,
  Faq,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  faqPlain,
  faqSchema,
  fromMeta,
  getPosts,
  getServices,
  schemaList,
} from '@/components/wg';
import {
  AcademyBlock,
  BlogTeaser,
  CaseStudy,
  Flywheel,
  HOME_FAQS,
  Hero,
  Services,
  StatBand,
} from './components/sections';

export const revalidate = 3600;

const payload = await getPayload({ config });
const homePageData = await payload.findGlobal({ slug: 'homepage' });

export async function generateMetadata() {
  return getMeta({
    meta: homePageData?.meta,
    path: '/',
    fallback: {
      title: 'WizGrowth | Growth Marketing Agency & Academy in Kochi, Kerala',
      description:
        'WizGrowth grows brands with SEO, demand generation and AI citations (GEO) — and trains marketers on the same live client work. Kochi, Kerala; clients everywhere.',
    },
  });
}

export default async function HomePage() {
  const [services, posts] = await Promise.all([getServices(), getPosts()]);
  const salaryReport = posts.find((p) => p.slug.trim() === 'digital-marketing-salary-india');
  const latest = posts.filter((p) => p.id !== salaryReport?.id).slice(0, 3);

  const structuredData = schemaList(
    fromMeta(homePageData?.meta?.schema),
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    faqSchema(HOME_FAQS.map((f) => ({ question: f.question, answer: faqPlain(f) }))),
  );

  return (
    <>
      <Schema structuredData={structuredData} />
      <Hero />
      <StatBand />
      <Flywheel />
      <Services services={services} />
      <CaseStudy />
      <AcademyBlock />
      <BlogTeaser posts={latest} salaryReport={salaryReport} />
      <Faq items={HOME_FAQS} />
      <EndCta />
    </>
  );
}
