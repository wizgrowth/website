'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { ArticleHeading } from '@/payload-components/richtext/headings';

type ReadingRailProps = {
  headings: ArticleHeading[];
  /** For the article_view and article_read_progress analytics events. */
  slug: string;
  /** The call to action under the contents, rendered on the server. */
  children?: ReactNode;
};

const DESKTOP = '(min-width: 1280px)';

// The design's reading state: how far through the body the reader is, and
// which section is current. `anchor` is the reading line below the viewport top.
function readingState(
  scroll: number,
  viewport: number,
  top: number,
  height: number,
  sections: number[],
  anchor: number,
) {
  const distance = Math.max(1, height - viewport + anchor);
  const fraction = Math.max(0, Math.min(1, (scroll + anchor - top) / distance));
  let current = 0;
  sections.forEach((position, i) => {
    if (position <= scroll + anchor + 8) current = i;
  });
  return { fraction, current };
}

function emit(detail: Record<string, unknown>) {
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(detail);
  document.dispatchEvent(new CustomEvent('wg:analytics', { detail }));
}

// Contents rail, reading meter and the thin progress line at the top of the
// page. The contents list is open on wide screens and folds on narrow ones.
export function ReadingRail({ headings, slug, children }: ReadingRailProps) {
  const [open, setOpen] = useState(true);
  const [percent, setPercent] = useState(0);
  const [current, setCurrent] = useState(0);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = matchMedia(DESKTOP);
    const sync = () => setOpen(desktop.matches);
    sync();
    desktop.addEventListener('change', sync);
    return () => desktop.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const body = document.querySelector<HTMLElement>('.j-prose');
    if (!body) return;
    const desktop = matchMedia(DESKTOP);
    const seen = new Set<number>();
    emit({ event: 'article_view', article: slug });
    let scheduled = false;
    const update = () => {
      scheduled = false;
      const rect = body.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const sections = Array.from(body.querySelectorAll<HTMLElement>('h2[id]')).map(
        (h) => h.getBoundingClientRect().top + window.scrollY,
      );
      const state = readingState(
        window.scrollY,
        window.innerHeight,
        top,
        rect.height,
        sections,
        desktop.matches ? 40 : 76,
      );
      if (progress.current) progress.current.style.transform = `scaleX(${state.fraction})`;
      setPercent(Math.round(state.fraction * 100));
      setCurrent(state.current);
      const read = (window.innerHeight - rect.top) / rect.height;
      for (const mark of [50, 90]) {
        if (read >= mark / 100 && !seen.has(mark)) {
          seen.add(mark);
          emit({ event: 'article_read_progress', article: slug, percent: mark });
        }
      }
    };
    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [slug]);

  return (
    <>
      <div className="j-progress" aria-hidden="true" ref={progress} />
      <aside className="j-toc" aria-label="Article contents">
        {headings.length > 0 && (
          <details
            className="j-contents"
            open={open}
            onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary>
              <span>In this article</span>
              <span className="j-read-percent" aria-hidden="true">
                {percent}%
              </span>
            </summary>
            <nav>
              {headings.map((h, i) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className={i === current ? 'active' : undefined}
                  aria-current={i === current ? 'location' : undefined}
                  onClick={() => {
                    if (!matchMedia(DESKTOP).matches) setOpen(false);
                  }}
                >
                  {h.title}
                </a>
              ))}
            </nav>
            <div className="j-toc-meter">
              <progress
                className="j-reading-meter"
                value={percent}
                max={100}
                aria-label="Article reading progress"
              />
              <span className="j-toc-caption">YOUR READING PROGRESS</span>
            </div>
          </details>
        )}
        {children}
      </aside>
    </>
  );
}
