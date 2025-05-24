import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor'
import { BlogPost } from './types'

type ContentProps = {
  innerData: BlogPost
}

export function Content({ innerData }: ContentProps) {
  return (
    <section>
      <div className="container">
        <div
          className="[&_.payload-richtext>h2]:text-4xl [&_.payload-richtext>h2]:leading-10 [&_.payload-richtext>h2]:max-sm:text-3xl [&_.payload-richtext>h2]:max-sm:leading-9 [&_.payload-richtext>h2]:font-bold [&_.payload-richtext>h2]:text-slate-900 [&_.payload-richtext>h2>strong]:font-bold [&_.payload-richtext>h2]:mb-7 [&_.payload-richtext>h3]:mb-6 [&_.payload-richtext>h3]:text-3xl [&_.payload-richtext>h3]:leading-9 [&_.payload-richtext>h3]:max-sm:text-2xl [&_.payload-richtext>h3]:max-sm:leading-8 [&_.payload-richtext>h3]:font-bold [&_.payload-richtext>h4]:mb-5 [&_.payload-richtext>h4]:text-2xl [&_.payload-richtext>h4]:leading-8 [&_.payload-richtext>h4]:max-sm:text-xl [&_.payload-richtext>h4]:max-sm:leading-7 [&_.payload-richtext>h4]:font-bold [&_.payload-richtext>h5]:mb-2 [&_.payload-richtext>h5]:text-xl [&_.payload-richtext>h5]:leading-7 [&_.payload-richtext>h5]:max-sm:text-lg [&_.payload-richtext>h5]:max-sm:leading-6 [&_.payload-richtext>h5]:font-bold [&_.payload-richtext>h6]:mb-2 [&_.payload-richtext>h6]:text-lg [&_.payload-richtext>h6]:leading-6 [&_.payload-richtext>h6]:max-sm:text-base [&_.payload-richtext>h6]:max-sm:leading-5 [&_.payload-richtext>h6]:font-bold
        [&_.payload-richtext>p]:leading-6 [&_.payload-richtext>p]:text-slate-900 [&_.payload-richtext>p]:sm:leading-7 [&_.payload-richtext>p]:mb-5
        [&_.payload-richtext>ul_li]:list-disc [&_.payload-richtext>ul_li]:mb-2 [&_.payload-richtext>ul]:mb-7 [&_.payload-richtext>ol_li]:list-disc [&_.payload-richtext>ol_li]:mb-2 [&_.payload-richtext>ol]:mb-7 [&_.payload-richtext>img]:mb-6 [&_.payload-richtext>img]:w-auto [&_.payload-richtext>img]:rounded-3xl [&_.payload-richtext>img]:h-auto"
        >
          <RichTextConverterComponent data={innerData?.content} />
        </div>
      </div>
    </section>
  )
}
