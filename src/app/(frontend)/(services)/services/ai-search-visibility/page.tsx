import { ServicePage, serviceMetadata } from '../../service-page';
import { AI } from '../../markup/ai';

// Re-rendered on save from the admin panel (SEO fields), and hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(AI);
}

export default function Page() {
  return <ServicePage page={AI} />;
}
