import type { BlogInner } from '@/payload-types';

export function Tldr({ post }: { post: BlogInner }) {
  const items = post.tldr ?? [];
  if (items.length === 0) return null;
  return (
    <aside className="tldr shell" style={{ paddingLeft: 32, paddingRight: 32 }}>
      <div className="tldr-label">TL;DR — The honest version</div>
      <ul>
        {items.map((item) => (
          <li key={item.id ?? item.text}>
            {item.label && <strong>{item.label} </strong>}
            {item.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
