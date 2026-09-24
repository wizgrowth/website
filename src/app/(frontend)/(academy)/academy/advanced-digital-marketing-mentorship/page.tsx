import { getMeta } from '@/app/utils/get-meta';
import { AcademyMarkup } from '../../academy-page';
import { MENTORSHIP } from '../../markup/mentorship';

export async function generateMetadata() {
  return getMeta({
    path: MENTORSHIP.url,
    fallback: { title: MENTORSHIP.title, description: MENTORSHIP.description },
  });
}

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Academy', href: '/academy/' },
  { label: 'Advanced Digital Marketing Mentorship', href: MENTORSHIP.url },
];

export default function MentorshipPage() {
  return <AcademyMarkup page={MENTORSHIP} crumbs={CRUMBS} />;
}
