type Section = { value: string; label: string; posts: unknown[] };

// Anchor chips to each category section, with counts. Only rendered when
// there is more than one section to jump between.
export function CategoryNav({ sections, total }: { sections: Section[]; total: number }) {
  if (sections.length < 2) return null;
  return (
    <nav className="shell" aria-label="Browse by category">
      <div className="cat-nav">
        <a href="#latest" className="is-all">
          All <b>{total}</b>
        </a>
        {sections.map((s) => (
          <a key={s.value} href={`#cat-${s.value.replace(/\s+/g, '-')}`}>
            {s.label} <b>{s.posts.length}</b>
          </a>
        ))}
      </div>
    </nav>
  );
}
