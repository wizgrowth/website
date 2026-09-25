import { ServicePage, serviceMetadata } from '../../service-page';
import { CONSULT } from '../../markup/consult';

export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(CONSULT);
}

export default function Page() {
  return <ServicePage page={CONSULT} />;
}
