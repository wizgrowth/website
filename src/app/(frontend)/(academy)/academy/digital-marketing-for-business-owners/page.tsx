import { getMeta } from '@/app/utils/get-meta';
import { AcademyMarkup } from '../../academy-page';
import { OWNERS } from '../../markup/owners';

export async function generateMetadata() {
  return getMeta({
    path: OWNERS.url,
    fallback: { title: OWNERS.title, description: OWNERS.description },
  });
}

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Academy', href: '/academy/' },
  { label: 'Digital Marketing for Business Owners', href: OWNERS.url },
];

export default function BusinessOwnersPage() {
  return <AcademyMarkup page={OWNERS} crumbs={CRUMBS} />;
}
