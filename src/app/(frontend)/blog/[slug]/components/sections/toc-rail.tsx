'use client';

import { useEffect } from 'react';
import type { SideMenu } from '@/payload-types';

type TocRailProps = {
  items: SideMenu;
};

/** Sticky table of contents. Highlights the heading currently in view. */
export function TocRail({ items }: TocRailProps) {
  useEffect(() => {
    const ids = (items ?? [])
      .map((item) => item.titleId)
      .filter((id): id is string => Boolean(id));
    if (ids.length === 0) return;

    const links = new Map<string, HTMLAnchorElement>();
    document.querySelectorAll<HTMLAnchorElement>('#article-toc a').forEach((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      if (id) links.set(id, link);
    });

    let active: string | null = null;

    const setActive = (id: string | null) => {
      if (id === active) return;
      if (active) links.get(active)?.classList.remove('active');
      if (id) links.get(id)?.classList.add('active');
      active = id;
    };

    const headings = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headings.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // The last heading whose top has passed a quarter of the viewport wins.
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= window.innerHeight * 0.25) {
          current = heading.id;
        }
      }
      setActive(current ?? headings[0].id);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <aside
      id="article-toc"
      className="article-toc sticky top-28 hidden lg:block"
      aria-label="Inside this article"
    >
      <p className="mb-3 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[rgba(14,23,21,0.62)]">
        Inside this article
      </p>
      <nav>
        {items.map((item) => (
          <a key={item.id ?? item.titleId} href={`#${item.titleId}`}>
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
