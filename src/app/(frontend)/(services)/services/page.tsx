import { getPayload } from 'payload';
import config from '@payload-config';
import { getMeta } from '@/app/utils/get-meta';
import { fromMeta } from '@/components/wg';
import { ServicePage } from '../service-page';
import { HUB } from '../markup/hub';

// The services hub. Its SEO fields come from the `services` global, as
// before; the page itself is the approved design.
export const revalidate = 3600;

const payload = await getPayload({ config });
const servicesPageMetaData = await payload.findGlobal({ slug: 'services' });

export async function generateMetadata() {
  return getMeta({
    meta: servicesPageMetaData?.meta,
    path: HUB.url,
    fallback: { title: HUB.title, description: HUB.description },
  });
}

export default function ServicesHub() {
  return <ServicePage page={HUB} editorSchema={fromMeta(servicesPageMetaData?.meta?.schema)} />;
}
