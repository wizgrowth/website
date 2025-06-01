import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor'
import { BlogPost } from './types'
import { FloatingMenu } from './floating-menu'

type ContentProps = {
  innerData: BlogPost
}

export function Content({ innerData }: ContentProps) {
  const { sideMenu } = innerData

  return (
    <section className="mt-24">
      <div className="container flex items-start gap-10">
        <div
          id="blog-floating-menu"
          className="basis-1/4  sticky top-40 [&>div>div>.active]:bg-primary-200"
        >
          <div>
            <p className="text-sm leading-1.5 font-bold text-slate-600 uppercase mb-2 pb-2 border-b border-slate-200">
              INSIDE THE ARTICLE
            </p>
            <div className="flex flex-col gap-3">
              {sideMenu.map((item) => {
                return <FloatingMenu key={item.id} data={item} />
              })}
            </div>
          </div>
        </div>
        <div
          className="basis-3/4 [&_.payload-richtext>h2]:text-4xl [&_.payload-richtext>h2]:leading-10 [&_.payload-richtext>h2]:max-sm:text-3xl [&_.payload-richtext>h2]:max-sm:leading-9 [&_.payload-richtext>h2]:font-bold [&_.payload-richtext>h2]:text-slate-900 [&_.payload-richtext>h2>strong]:font-bold [&_.payload-richtext>h2]:mb-7 [&_.payload-richtext>h3]:mb-6 [&_.payload-richtext>h3]:text-3xl [&_.payload-richtext>h3]:leading-9 [&_.payload-richtext>h3]:max-sm:text-2xl [&_.payload-richtext>h3]:max-sm:leading-8 [&_.payload-richtext>h3]:font-bold [&_.payload-richtext>h4]:mb-5 [&_.payload-richtext>h4]:text-2xl [&_.payload-richtext>h4]:leading-8 [&_.payload-richtext>h4]:max-sm:text-xl [&_.payload-richtext>h4]:max-sm:leading-7 [&_.payload-richtext>h4]:font-bold [&_.payload-richtext>h5]:mb-2 [&_.payload-richtext>h5]:text-xl [&_.payload-richtext>h5]:leading-7 [&_.payload-richtext>h5]:max-sm:text-lg [&_.payload-richtext>h5]:max-sm:leading-6 [&_.payload-richtext>h5]:font-bold [&_.payload-richtext>h6]:mb-2 [&_.payload-richtext>h6]:text-lg [&_.payload-richtext>h6]:leading-6 [&_.payload-richtext>h6]:max-sm:text-base [&_.payload-richtext>h6]:max-sm:leading-5 [&_.payload-richtext>h6]:font-bold
        [&_.payload-richtext>p]:leading-6 [&_.payload-richtext>p]:text-slate-900 [&_.payload-richtext>p]:sm:leading-7 [&_.payload-richtext>p]:mb-5
        [&_.payload-richtext>ul_li]:list-disc [&_.payload-richtext>ul_li]:mb-2 [&_.payload-richtext>ul]:mb-7 [&_.payload-richtext>ol_li]:list-disc [&_.payload-richtext>ol_li]:mb-2 [&_.payload-richtext>ol]:mb-7 [&_.payload-richtext>img]:mb-6 [&_.payload-richtext>img]:w-auto [&_.payload-richtext>img]:rounded-3xl [&_.payload-richtext>img]:h-auto"
        >
          <RichTextConverterComponent data={innerData?.content} />
        </div>
      </div>
    </section>
  )
}
