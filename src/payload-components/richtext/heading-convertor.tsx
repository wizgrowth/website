import React, { JSX } from 'react'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import type { SerializedHeadingNode } from '@payloadcms/richtext-lexical'

// Helper function to extract plain text from JSX elements for ID generation
const extractPlainText = (elements: React.ReactNode[]): string => {
  return elements
    .map((element) => {
      if (typeof element === 'string') {
        return element
      }
      if (React.isValidElement(element)) {
        // Type guard to safely access props
        const props = element.props as { children?: React.ReactNode }
        if (props.children) {
          // Recursively extract text from nested elements
          const children = Array.isArray(props.children) ? props.children : [props.children]
          return extractPlainText(children)
        }
      }
      return ''
    })
    .join('')
}

// Custom heading converter
export const headingConverter: JSXConverters<SerializedHeadingNode> = {
  heading: ({ node, nodesToJSX }) => {
    const content = nodesToJSX({ nodes: node.children })

    // Check if we need to process asterisk-wrapped content
    const plainText = extractPlainText(content)
    const hasAsteriskWrapping = plainText.includes('*')
    let processedContent = content
    let idText = plainText.split('*').length > 1 ? plainText.split('*')[0] : plainText
    console.log(processedContent)
    if (hasAsteriskWrapping) {
      const textParts = plainText.split('*')
      if (textParts.length > 1) {
        idText = textParts[0]
        processedContent = content
          .map((element) => {
            if (typeof element === 'string') {
              const parts = element.split('*')
              return parts.length > 1 ? parts[1] : element
            }
            return element
          })
          .filter(Boolean)
      }
    }

    // Only add ID for h2-h6 headings
    if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tag) && plainText.split('*').length > 1) {
      const id = idText
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

      return React.createElement(node.tag, { id }, ...processedContent)
    } else {
      const Tag = node.tag as keyof JSX.IntrinsicElements
      return <Tag>{processedContent}</Tag>
    }
  },
}
