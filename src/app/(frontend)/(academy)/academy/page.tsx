import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { fromMeta } from '@/components/wg';
import { AcademyMarkup } from '../academy-page';
import { HUB } from '../markup/hub';

// Re-rendered on save from the admin panel, and hourly as a safety net. Only
// the SEO fields come from the CMS; the page itself is the approved design.
export const revalidate = 3600;

const payload = await getPayload({ config });
const academyPageData = await payload.findGlobal({ slug: 'academy' });

export async function generateMetadata() {
  return getMeta({
    meta: academyPageData?.meta,
    path: HUB.url,
    fallback: { title: HUB.title, description: HUB.description },
  });
}

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Academy', href: '/academy/' },
];

export default function AcademyHome() {
  return (
    <AcademyMarkup page={HUB} crumbs={CRUMBS} editorSchema={fromMeta(academyPageData?.meta?.schema)} />
  );
}
