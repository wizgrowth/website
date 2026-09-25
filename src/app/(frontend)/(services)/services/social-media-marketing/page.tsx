import { ServicePage, serviceMetadata } from '../../service-page';
import { SOCIAL } from '../../markup/social';

// Re-rendered on save from the admin panel (SEO fields), and hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(SOCIAL);
}

export default function Page() {
  return <ServicePage page={SOCIAL} />;
}
