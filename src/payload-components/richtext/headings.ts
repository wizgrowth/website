import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';

/** One slug rule for heading ids and the contents rail, so they never drift apart. */
export function headingSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[’'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type AnyNode = SerializedLexicalNode & {
  children?: AnyNode[];
  text?: string;
  tag?: string;
};

function nodeText(node: AnyNode): string {
  if (typeof node.text === 'string') return node.text;
  return (node.children ?? []).map(nodeText).join('');
}

/**
 * Older articles used a "Anchor*Visible heading" convention: the part before
 * the asterisk is the anchor, the part after is displayed. Both conventions
 * resolve to the same {id, title} here.
 */
export function splitHeading(raw: string) {
  const parts = raw.split('*');
  if (parts.length > 1) {
    return { id: headingSlug(parts[0]), title: parts.slice(1).join('*').trim() || parts[0].trim() };
  }
  return { id: headingSlug(raw), title: raw.trim() };
}

export type ArticleHeading = { id: string; title: string };

/** The h2 headings in a rich-text body, in order. Drives the contents rail. */
export function extractHeadings(
  content: SerializedEditorState<SerializedLexicalNode> | null | undefined,
): ArticleHeading[] {
  const root = content?.root as AnyNode | undefined;
  if (!root?.children) return [];
  const out: ArticleHeading[] = [];
  const seen = new Map<string, number>();
  for (const node of root.children) {
    if (node.type !== 'heading' || node.tag !== 'h2') continue;
    const { id, title } = splitHeading(nodeText(node));
    if (!id || !title) continue;
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    out.push({ id: n === 0 ? id : `${id}-${n + 1}`, title });
  }
  return out;
}
