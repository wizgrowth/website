import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  ACADEMY,
  Breadcrumb,
  CANONICAL_ORIGIN,
  EndCta,
  Faq,
  ORG_ID,
  StickyCta,
  WA_ACADEMY_DETAILS,
  WA_ACADEMY_JOIN,
  WA_ACADEMY_QUESTION,
  WA_ACADEMY_SYLLABUS,
  WaIcon,
  breadcrumbSchema,
  faqPlain,
  faqSchema,
  fromMeta,
  schemaList,
} from '@/components/wg';
import { ACADEMY_FAQS, SYLLABUS } from './components/sections';

const payload = await getPayload({ config });
const academyPageData = await payload.findGlobal({ slug: 'academy' });

export async function generateMetadata() {
  return getMeta({
    meta: academyPageData?.meta,
    path: '/academy/',
    fallback: {
      title: 'Digital Marketing Course in Kochi, Kerala — WizGrowth Academy',
      description: `A 12-week digital marketing course taught from live agency campaigns — SEO, ads, content, analytics, portfolio and placement sprint. ${ACADEMY.fee}. New batches monthly. Kochi or live online.`,
    },
  });
}

const CRUMBS = [{ label: 'Home', href: '/' }, { label: 'Academy', href: '/academy/' }];

const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'WizGrowth Academy — Digital Marketing Programme',
  description:
    'A twelve-week digital marketing programme in Kochi, Kerala, taught from live agency client work: SEO, performance marketing, content, social, analytics, and a placement sprint.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'WizGrowth Academy',
    url: `${CANONICAL_ORIGIN}/academy/`,
    parentOrganization: { '@id': ORG_ID },
  },
  url: `${CANONICAL_ORIGIN}/academy/`,
  offers: { '@type': 'Offer', price: ACADEMY.feeNumber, priceCurrency: 'INR', category: 'Paid' },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      courseMode: ['Onsite', 'Online'],
      location: { '@type': 'Place', name: 'Kochi, Kerala, India' },
      courseWorkload: `P${ACADEMY.weeks}W`,
    },
  ],
};

export default function AcademyPage() {
  const structuredData = schemaList(
    fromMeta(academyPageData?.meta?.schema),
    breadcrumbSchema(CRUMBS),
    COURSE_SCHEMA,
    faqSchema(ACADEMY_FAQS.map((f) => ({ question: f.question, answer: faqPlain(f) }))),
  );

  return (
    <>
      <Schema structuredData={structuredData} />
      <Breadcrumb items={CRUMBS} />

      <header className="shell page-hero">
        <p className="microlabel green">WizGrowth Academy · Kochi, Kerala</p>
        <h1>
          Learn growth from people who <span className="fx">do it</span>
        </h1>
        <p className="lead">
          A twelve-week digital marketing programme taught from WizGrowth Agency’s live client work.
          Real campaigns from week two, senior mentors who currently run accounts, and a portfolio
          on graduation — not just a certificate for the wall.
        </p>
        <div className="hero-ctas">
          <a href={WA_ACADEMY_DETAILS} className="btn btn-wa">
            <WaIcon /> Chat about the Academy
          </a>
          <a href="#syllabus" className="btn btn-secondary">
            See the twelve weeks
          </a>
        </div>
        <p className="hero-note">
          {ACADEMY.fee} or 3 monthly payments · A new batch every month · In person in Kochi or
          live online
        </p>
      </header>

      <section className="shell section-tight" aria-label="Programme facts">
        <div className="ink-block on-ink">
          <span className="chip-gold">Admissions open — {ACADEMY.cadence}</span>
          <h2>
            The certificate is the <span className="fx">least</span> of it
          </h2>
          <p className="acad-lead">
            Academies sell certificates. Employers buy proof. The whole programme is engineered
            around leaving with verifiable work: campaigns you ran, numbers you moved, case studies
            you wrote. We’re a young academy — you’ll be in the early batches, and that means more
            mentor attention, not less.
          </p>
          <div className="acad-facts">
            <div className="acad-fact">
              <b>{ACADEMY.weeks} weeks</b>
              <span>live client work, not recorded theory</span>
            </div>
            <div className="acad-fact">
              <b>Week 2</b>
              <span>when you touch your first real campaign</span>
            </div>
            <div className="acad-fact">
              <b>Monthly</b>
              <span>{ACADEMY.cadence}</span>
            </div>
          </div>
          <p className="acad-price">
            {ACADEMY.fee} <small>or 3 monthly payments · terms in writing before you pay</small>
          </p>
          <div className="acad-ctas">
            <a href={WA_ACADEMY_JOIN} className="btn btn-paper">
              Join the next batch
            </a>
            <a href={WA_ACADEMY_SYLLABUS} className="btn btn-secondary on-ink">
              Get the syllabus on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="shell section-tight prose" id="syllabus" aria-label="Syllabus">
        <h2>
          The shape of the twelve <span className="fx">weeks</span>
        </h2>
        <p>
          Every module is taught from current agency work — when the curriculum says “live
          account,” it means a real business’s real budget, supervised by the person responsible
          for it.
        </p>
        <div className="syllabus">
          {SYLLABUS.map(([week, title, text]) => (
            <div className="syl-row" key={week}>
              <span className="syl-week">{week}</span>
              <div>
                <b>{title}</b>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section-tight prose" aria-label="Who it is for">
        <h2>
          Who it’s for — and who it <span className="fx">isn’t</span>
        </h2>
        <p>
          <strong>For:</strong> students and freshers who want their first job to count, working
          marketers stuck at the execution level, and career-switchers who’d rather build proof
          than collect certificates.
        </p>
        <p>
          <strong>Not for:</strong> certificate collectors. If you want a paper for the wall with no
          callus on your hands, cheaper options exist — and we’ll happily point you to them on the
          call.
        </p>
        <div className="panel">
          <span className="microlabel green">The honest number</span>
          <p>
            Most freshers earn ₹15,000–25,000 a month in their first role — not the ₹50,000 many
            academies advertise. What the twelve weeks change is your trajectory after that first
            job: specialization plus verifiable proof is what breaks the ₹6–8 LPA wall. The full
            data is in <Link href="/blog/digital-marketing-salary-india/">our salary report</Link>.
          </p>
        </div>
      </section>

      <Faq items={ACADEMY_FAQS} />

      <EndCta
        heading={
          <>
            Ask us anything about the <span className="fx">cohort</span>
          </>
        }
        body="Batch timings, syllabus, payment plans, whether it’s right for you — WhatsApp gets the fastest answer, usually within business hours."
        primary={{ href: WA_ACADEMY_QUESTION, label: 'Chat on WhatsApp' }}
        whatsapp={{ href: WA_ACADEMY_QUESTION, label: 'WhatsApp us' }}
      />

      <StickyCta
        reassure={`${ACADEMY.fee} or 3 payments · ${ACADEMY.cadence}`}
        href={WA_ACADEMY_DETAILS}
        label="Chat about the Academy"
      />
    </>
  );
}
