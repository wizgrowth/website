import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor'

export function Content({ innerData }) {
  return (
    <>
      <RichTextConverterComponent data={innerData?.content} />
    </>
  )
}
