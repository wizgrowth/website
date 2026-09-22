'use client';

import { useMemo, useState, type ReactNode } from 'react';
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

// The design's hub: search and topic filter in the rail, every article in
// the grid. All cards are in the HTML for crawlers; the filter only hides.
export function JournalHub({ items, topics, children }: JournalHubProps) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');

  const needle = query.trim().toLocaleLowerCase();
  const visible = useMemo(() => {
    const matches = (card: CardData) =>
      (topic === 'all' || card.topicValue === topic) &&
      (!needle || `${card.title} ${card.dek} ${card.topic}`.toLocaleLowerCase().includes(needle));
    return new Set(items.filter(matches).map((card) => card.id));
  }, [items, topic, needle]);

  const count = visible.size;
  const title = needle
    ? 'Search results'
    : topic === 'all'
      ? 'Explore the journal.'
      : (topics.find((t) => t.value === topic)?.label ?? topic);

  const reset = () => {
    setQuery('');
    setTopic('all');
    document.getElementById('article-search')?.focus();
  };

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
              onChange={(e) => setQuery(e.target.value)}
            />
          </span>
        </label>
        <div className="wg-topic-filter" role="group" aria-label="Filter articles by topic">
          <span className="j-label">EXPLORE TOPICS</span>
          <button type="button" aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
            All articles <span>{items.length}</span>
          </button>
          {topics.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={topic === t.value}
              onClick={() => setTopic(t.value)}
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
        <section className="wg-all" aria-labelledby="j-results-title">
          <div className="wg-section-heading">
            <h2 id="j-results-title">{title}</h2>
            <span id="j-result-count" role="status" aria-live="polite">
              {count} {count === 1 ? 'article' : 'articles'}
            </span>
          </div>
          <div className="wg-article-grid" id="j-article-grid">
            {items.map((card) => (
              <ArticleCard key={card.id} card={card} hidden={!visible.has(card.id)} />
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
        </section>
      </div>
    </div>
  );
}
