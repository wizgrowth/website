import Link from 'next/link';
import type { ServicePage } from '@/payload-types';

type ServiceCardProps = {
  service: Pick<ServicePage, 'slug' | 'name' | 'card' | 'cardCta'>;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="card">
      <h3>{service.name}</h3>
      {service.card && <p>{service.card}</p>}
      <Link className="btn btn-quiet" href={`/services/${service.slug}/`}>
        {service.cardCta || 'Learn more'}
      </Link>
    </article>
  );
}
