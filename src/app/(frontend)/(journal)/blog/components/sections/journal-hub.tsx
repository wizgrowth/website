'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import type { CardData } from '@/components/wg';
import { ArticleCard } from './article-card';
import { EnquiryButton } from './enquiry-button';

type Topic = { value: string; label: string; count: number };

type JournalHubProps = {
  items: CardData[];
  topics: Topic[];
  /** The spotlight and editor's picks, rendered on the server, shown above the grid. */
  children: ReactNode;
};

// Two rows of three on a wide screen, two pages of that below the fold.
const PAGE_SIZE = 12;

// Page numbers to show: first, last, and a window around the current page.
function pageList(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => pages.add(p));
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) out.push('gap');
    out.push(p);
  });
  return out;
}

// The design's hub: search and topic filter in the rail, every article in
// the grid. All cards are in the HTML for crawlers; the filter and the pager
// only hide, so a search engine still sees the whole archive.
export function JournalHub({ items, topics, children }: JournalHubProps) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const [page, setPage] = useState(1);
  const grid = useRef<HTMLElement>(null);

  const needle = query.trim().toLocaleLowerCase();
  const matching = useMemo(() => {
    const matches = (card: CardData) =>
      (topic === 'all' || card.topicValue === topic) &&
      (!needle || `${card.title} ${card.dek} ${card.topic}`.toLocaleLowerCase().includes(needle));
    return items.filter(matches).map((card) => card.id);
  }, [items, topic, needle]);

  const count = matching.length;
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = new Set(matching.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE));

  // A new page brings the reader back to the top of the grid. Filter and
  // search changes go back to page one without scrolling.
  const goTo = (next: number) => {
    setPage(next);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    grid.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };
  const changeTopic = (value: string) => {
    setTopic(value);
    setPage(1);
  };
  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const reset = () => {
    setQuery('');
    setTopic('all');
    setPage(1);
    document.getElementById('article-search')?.focus();
  };

  const title = needle
    ? 'Search results'
    : topic === 'all'
      ? 'Explore the journal.'
      : (topics.find((t) => t.value === topic)?.label ?? topic);

  return (
    <div className="shell wg-hub">
      <aside className="wg-topics" aria-label="Find an article">
        <label className="wg-search" htmlFor="article-search">
          <span className="j-label">FIND YOUR NEXT READ</span>
          <span className="wg-search-field">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" />
              <path d="m15 15 5 5" />
            </svg>
            <input
              type="search"
              id="article-search"
              placeholder="Search articles"
              autoComplete="off"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
            />
          </span>
        </label>
        <div className="wg-topic-filter" role="group" aria-label="Filter articles by topic">
          <span className="j-label">EXPLORE TOPICS</span>
          <button type="button" aria-pressed={topic === 'all'} onClick={() => changeTopic('all')}>
            All articles <span>{items.length}</span>
          </button>
          {topics.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={topic === t.value}
              onClick={() => changeTopic(t.value)}
            >
              {t.label}
              <span>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="wg-rail-note">
          <span className="wg-spark" aria-hidden="true">
            ✳
          </span>
          <h2>A little clarity goes a long way.</h2>
          <p>Let’s find what needs to move first in your business.</p>
          <EnquiryButton label="Let’s talk growth" />
        </div>
      </aside>
      <div className="wg-hub-content">
        {children}
        <section className="wg-all" aria-labelledby="j-results-title" ref={grid}>
          <div className="wg-section-heading">
            <h2 id="j-results-title">{title}</h2>
            <span id="j-result-count" role="status" aria-live="polite">
              {count} {count === 1 ? 'article' : 'articles'}
              {pages > 1 ? ` · page ${current} of ${pages}` : ''}
            </span>
          </div>
          <div className="wg-article-grid" id="j-article-grid">
            {items.map((card) => (
              <ArticleCard key={card.id} card={card} hidden={!shown.has(card.id)} />
            ))}
          </div>
          {count === 0 && (
            <div className="wg-empty" id="article-empty">
              <h3>No articles found.</h3>
              <p>Try a different word or choose another topic.</p>
              <button type="button" id="reset-search" onClick={reset}>
                Show all articles ↗
              </button>
            </div>
          )}
          {pages > 1 && (
            <nav className="wg-pagination" aria-label="Article pages">
              <button
                type="button"
                onClick={() => goTo(current - 1)}
                disabled={current === 1}
                aria-label="Previous page"
              >
                ← Prev
              </button>
              {pageList(current, pages).map((p, i) =>
                p === 'gap' ? (
                  <span className="wg-page-gap" aria-hidden="true" key={`gap-${i}`}>
                    …
                  </span>
                ) : (
                  <button
                    type="button"
                    key={p}
                    onClick={() => goTo(p)}
                    aria-current={p === current ? 'page' : undefined}
                    aria-label={`Page ${p}`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                disabled={current === pages}
                aria-label="Next page"
              >
                Next →
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}
