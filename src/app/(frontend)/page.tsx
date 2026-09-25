import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { Schema } from '@/components/scripts/schema';
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  faqSchema,
  fromMeta,
  schemaList,
} from '@/components/wg';
import './fresh.css';
import './header.css';
import { siteHeader } from './chrome';
import { HOME_MARKUP } from './home-markup';

// The markup is the approved design, shipped verbatim rather than rewritten as
// components, so the live page cannot drift from what was signed off. Its
// behaviour lives in /fresh/app.js. Nothing on this page comes from the CMS
// except the SEO fields below; the hourly window matches the other pages and
// lets a save in the admin panel refresh it on demand.
export const revalidate = 3600;

// The approved markup's own header and menu dialog are swapped for the site
// header (see chrome.ts); its "Let's talk" carries data-contact, which
// /fresh/app.js binds to the enquiry dialog.
const MARKUP = HOME_MARKUP.replace(
  /<div class="dark-top" id="top">[\s\S]*?<\/header>\s*<\/div>\s*<\/div>/,
  () => siteHeader({ contact: 'href="#contact" data-contact' }),
).replace(/<dialog class="menu-dialog"[\s\S]*?<\/dialog>/, '');

const payload = await getPayload({ config });
const homePageData = await payload.findGlobal({ slug: 'homepage' });

const TITLE = 'WizGrowth — Great brands. Bigger futures.';
const DESCRIPTION =
  'Get found. Get chosen. Keep growing. WizGrowth brings search, demand and AI visibility together to move your brand forward — from Kochi, Kerala.';

export async function generateMetadata() {
  return getMeta({
    meta: homePageData?.meta,
    path: '/',
    fallback: { title: TITLE, description: DESCRIPTION },
  });
}

export const viewport = {
  themeColor: '#10120f',
};

// Kept in step with the three questions shown on the page; the schema text and
// the visible text have to match.
const HOME_FAQS = [
  {
    question: 'Where would we start?',
    answer:
      'With a conversation about your goals, what’s working, and what isn’t. The first step is to agree on the problem worth solving, not to add another channel to your list.',
  },
  {
    question: 'Do all three disciplines need to be involved?',
    answer:
      'Not necessarily. The right starting point depends on the problem. Search, demand and AI visibility can support each other, but the plan should follow your priorities.',
  },
  {
    question: 'What does progress look like?',
    answer:
      'We agree on the measures that matter before the work begins. Then we review the evidence together, including what needs to change. No guaranteed rankings or one-size-fits-all growth promises.',
  },
];

export default function HomePage() {
  const structuredData = schemaList(
    fromMeta(homePageData?.meta?.schema),
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    faqSchema(HOME_FAQS),
  );

  return (
    <>
      <Schema structuredData={structuredData} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
      {/* A real deferred script tag, not next/script: this page is static
          markup, so its behaviour should not wait on React hydrating, and the
          tag belongs in the server HTML where a failure is visible. */}
      <script defer src="/fresh/app.js" />
      <script defer src="/header.js" />
    </>
  );
}
