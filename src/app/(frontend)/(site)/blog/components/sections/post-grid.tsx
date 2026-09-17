'use client';

import { useState, type ReactNode } from 'react';

type PostGridProps = { children: ReactNode; total: number; collapsible?: boolean };

// Every card is in the HTML for crawlers; long grids start folded and a
// button reveals the rest, so a 50-article category does not become a wall.
export function PostGrid({ children, total, collapsible = true }: PostGridProps) {
  const [open, setOpen] = useState(!collapsible || total <= 6);
  return (
    <>
      <div className={`post-grid${open ? '' : ' is-collapsed'}`}>{children}</div>
      {!open && (
        <div className="grid-more">
          <button type="button" className="btn btn-secondary" onClick={() => setOpen(true)}>
            Show all {total} articles
          </button>
        </div>
      )}
    </>
  );
}
