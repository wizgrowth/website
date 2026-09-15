import Link from 'next/link';
import { Fragment } from 'react';

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <div className="breadcrumb">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {i > 0 && <span className="sep">/</span>}
              {last || !item.href ? (
                <span className="current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}
