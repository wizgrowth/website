import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';
import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor';
import { extractHeadings } from '@/payload-components/richtext/headings';
import type { BlogInner } from '@/payload-types';

// The contents rail is derived from the h2s in the body — never typed by an
// editor — so an anchor can never drift from the heading it points at.
export function Body({ post }: { post: BlogInner }) {
  const content = post.content as SerializedEditorState<SerializedLexicalNode> | null | undefined;
  const headings = extractHeadings(content);

  return (
    <div className="article-layout">
      <aside className="toc-rail" aria-label="On this page">
        {headings.length > 0 && (
          <>
            <div className="toc-label">On this page</div>
            <ul className="toc-list">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.title}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
      <article className="article-body">
        {content && <RichTextConverterComponent data={content} />}
      </article>
      <div />
    </div>
  );
}
