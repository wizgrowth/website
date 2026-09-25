import { ServicePage, serviceMetadata } from '../../service-page';
import { CONSULT } from '../../markup/consult';

// Draft: noindex and unlinked until the hand-off's placeholders (prices,
// timelines, case studies, languages) are confirmed. See design/services/README.md.
export const revalidate = 3600;

export function generateMetadata() {
  return serviceMetadata(CONSULT);
}

export default function Page() {
  return <ServicePage page={CONSULT} />;
}
