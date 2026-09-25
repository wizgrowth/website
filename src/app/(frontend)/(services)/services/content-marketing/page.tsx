import { ServicePage, serviceMetadata } from '../../service-page';
import { CONTENT } from '../../markup/content';

// Re-rendered on save from the admin panel (SEO fields), and hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(CONTENT);
}

export default function Page() {
  return <ServicePage page={CONTENT} />;
}
