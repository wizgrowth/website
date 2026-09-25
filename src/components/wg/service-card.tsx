import Link from 'next/link';
import { serviceHref } from './services-data';
import type { ServicePage } from '@/payload-types';

type ServiceCardProps = {
  service: Pick<ServicePage, 'slug' | 'name' | 'card' | 'cardCta'>;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card">
      <h3>{service.name}</h3>
      {service.card && <p>{service.card}</p>}
      <Link className="btn btn-quiet" href={serviceHref(service.slug)}>
        {service.cardCta || 'Learn more'}
      </Link>
    </article>
  );
}
