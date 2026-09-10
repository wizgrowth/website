import { RichTextConverterComponent } from '@/payload-components/richtext/richtext-convertor';
import type { BlogInner } from '@/payload-types';
import { TocRail } from './toc-rail';

type ContentProps = {
  innerData: BlogInner;
};

export function Content({ innerData }: ContentProps) {
  const hasToc = Boolean(innerData?.sideMenu && innerData.sideMenu.length > 0);

  return (
    <section className="mt-20 max-[720px]:mt-14">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <div
          className={
            hasToc
              ? 'grid grid-cols-1 items-start gap-16 lg:grid-cols-[240px_1fr] lg:gap-20'
              : 'grid grid-cols-1'
          }
        >
          {hasToc && <TocRail items={innerData.sideMenu!} />}
          <div className="article-body min-w-0">
            <RichTextConverterComponent data={innerData?.content as any} />
          </div>
        </div>
      </div>
    </section>
  );
}
