import { ServicePage, serviceMetadata } from '../../service-page';
import { SEO } from '../../markup/seo';

// Re-rendered on save from the admin panel (SEO fields), and hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(SEO);
}

export default function Page() {
  return <ServicePage page={SEO} />;
}
