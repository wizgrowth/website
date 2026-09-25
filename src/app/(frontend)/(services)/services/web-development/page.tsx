import { ServicePage, serviceMetadata } from '../../service-page';
import { WEB } from '../../markup/web';

// Re-rendered on save from the admin panel (SEO fields), and hourly.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(WEB);
}

export default function Page() {
  return <ServicePage page={WEB} />;
}
