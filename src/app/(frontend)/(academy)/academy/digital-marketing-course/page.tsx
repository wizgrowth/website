import { getMeta } from '@/app/utils/get-meta';
import { AcademyMarkup } from '../../academy-page';
import { COURSE } from '../../markup/course';

export async function generateMetadata() {
  return getMeta({
    path: COURSE.url,
    fallback: { title: COURSE.title, description: COURSE.description },
  });
}

const CRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Academy', href: '/academy/' },
  { label: 'Digital Marketing Course with AI', href: COURSE.url },
];

export default function CoursePage() {
  return <AcademyMarkup page={COURSE} crumbs={CRUMBS} />;
}
