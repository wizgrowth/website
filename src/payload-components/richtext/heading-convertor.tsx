import React, { JSX } from 'react';
import type { JSXConverters } from '@payloadcms/richtext-lexical/react';
import type { SerializedHeadingNode } from '@payloadcms/richtext-lexical';
import { splitHeading } from './headings';

const extractPlainText = (elements: React.ReactNode[]): string =>
  elements
    .map((element) => {
      if (typeof element === 'string') return element;
      if (React.isValidElement(element)) {
        const props = element.props as { children?: React.ReactNode };
        if (props.children) {
          const children = Array.isArray(props.children) ? props.children : [props.children];
          return extractPlainText(children);
        }
      }
      return '';
    })
    .join('');

// Every h2–h6 gets an id derived from its text (the same rule the contents
// rail uses). Section numbers are not stored: wg.css counts h2s with a CSS
// counter, so they renumber themselves when a section moves.
export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const content = nodesToJSX({ nodes: node.children });
    const plainText = extractPlainText(content);
    const { id } = splitHeading(plainText);

    let displayed: React.ReactNode[] = content;
    if (plainText.includes('*')) {
      displayed = content
        .map((element) => {
          if (typeof element === 'string') {
            const parts = element.split('*');
            return parts.length > 1 ? parts.slice(1).join('*') : element;
          }
          return element;
        })
        .filter(Boolean);
    }

    const Tag = node.tag as keyof JSX.IntrinsicElements;
    const withId = ['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tag) && Boolean(id);
    const props: React.HTMLAttributes<HTMLHeadingElement> = withId ? { id } : {};
    return React.createElement(Tag, props, ...displayed);
  },
};
