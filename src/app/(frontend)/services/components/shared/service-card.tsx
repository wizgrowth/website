import Link from 'next/link';
import type { ServicePage } from '@/payload-types';
import { ArrowIcon } from './icons';

type ServiceCardProps = {
  service: Pick<ServicePage, 'slug' | 'name' | 'card' | 'cardCta'>;
  index?: number;
  compact?: boolean;
};

export function ServiceCard({ service, index, compact = false }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={compact ? 'wg-card wg-card--compact' : 'wg-card'}
    >
      {!compact && (
        <div className="wg-card-top">
          {typeof index === 'number' && (
            <span className="wg-card-num">{String(index + 1).padStart(2, '0')}</span>
          )}
          <span className="wg-card-mark" aria-hidden="true">
            <ArrowIcon />
          </span>
        </div>
      )}
      <h3>{service.name}</h3>
      {service.card && <p>{service.card}</p>}
      <span className="wg-btn wg-btn--quiet">
        {service.cardCta || 'Learn more'} <ArrowIcon />
      </span>
    </Link>
  );
}
