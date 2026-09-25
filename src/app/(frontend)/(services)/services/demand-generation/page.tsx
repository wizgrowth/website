import { ServicePage, serviceMetadata } from '../../service-page';
import { DEMAND } from '../../markup/demand';

// Re-rendered on save from the admin panel (SEO fields), and hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(DEMAND);
}

export default function Page() {
  return <ServicePage page={DEMAND} />;
}
