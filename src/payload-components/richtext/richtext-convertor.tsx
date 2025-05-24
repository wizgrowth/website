import React from 'react'
import { RichText, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { headingConverter } from './heading-convertor'

// Merge with default converters
const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...headingConverter,
})

export const RichTextConverterComponent = ({ data }: { data: SerializedEditorState }) => {
  return <RichText data={data} converters={jsxConverters} />
}
