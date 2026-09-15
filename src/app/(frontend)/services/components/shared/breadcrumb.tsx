import Link from 'next/link';
import { Fragment } from 'react';

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="wg-shell">
      <ol className="wg-breadcrumb">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.label}>
              {i > 0 && (
                <li aria-hidden="true" className="wg-sep">
                  /
                </li>
              )}
              <li>
                {last || !item.href ? (
                  <span className="wg-current" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
