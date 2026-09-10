import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { BlogInner } from '@/payload-types';
import { Reveal } from '../reveal';
import { categoryLabel } from './categories';

type ArticleHeaderProps = {
  innerData: BlogInner;
};

const microlabel =
  'font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em]';

export function ArticleHeader({ innerData }: ArticleHeaderProps) {
  const author =
    innerData?.publishedBy && typeof innerData.publishedBy === 'object'
      ? innerData.publishedBy
      : null;

  const authorImage =
    author?.profilePicture && typeof author.profilePicture === 'object'
      ? author.profilePicture
      : null;

  const featuredImage =
    innerData?.featuredImage && typeof innerData.featuredImage === 'object'
      ? innerData.featuredImage
      : null;

  const category = categoryLabel(innerData?.category);
  const published = innerData?.publishedDate ?? innerData?.createdAt;
  const publishedLabel = published ? format(new Date(published), 'd MMM yyyy') : null;
  const crumb = innerData?.crumb || innerData?.title;

  return (
    <header className="pt-32 max-[720px]:pt-24">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <nav
          aria-label="Breadcrumb"
          className={`${microlabel} mb-10 flex flex-wrap items-center gap-2 text-[rgba(14,23,21,0.62)] max-[720px]:mb-7`}
        >
          <Link href="/" className="hover:text-[#0E1715]">
            Home
          </Link>
          <span aria-hidden="true" className="text-[rgba(14,23,21,0.32)]">
            /
          </span>
          <Link href="/blog/" className="hover:text-[#0E1715]">
            Blog
          </Link>
          {crumb && (
            <>
              {/* On narrow screens the title wraps to a second line and gets
                  truncated mid-word, so the trail stops at Blog there. */}
              <span aria-hidden="true" className="text-[rgba(14,23,21,0.32)] max-[560px]:hidden">
                /
              </span>
              <span
                aria-current="page"
                className="max-w-[42ch] truncate text-[#0E1715] max-[560px]:hidden"
              >
                {crumb}
              </span>
            </>
          )}
        </nav>

        <div>
          <Reveal>
            <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              {category && (
                <span
                  className={`${microlabel} rounded-full border border-[rgba(14,23,21,0.24)] px-3.5 py-1.5 text-[#14352A]`}
                >
                  {category}
                </span>
              )}
              <span className={`${microlabel} text-[rgba(14,23,21,0.62)]`}>
                {innerData?.readingTime}
                {innerData?.readingTime && publishedLabel ? ' · ' : ''}
                {publishedLabel}
              </span>
            </div>

            {innerData?.title && (
              <h1 className="max-w-[26ch] font-[family-name:var(--font-fraunces),Georgia,serif] text-[clamp(36px,5.4vw,68px)] font-medium leading-[1.02] tracking-[-0.028em] text-[#0E1715] [font-variation-settings:'opsz'_120,'SOFT'_30]">
                {innerData.title}
              </h1>
            )}

            {innerData?.dek && (
              <p className="mt-8 max-w-[58ch] text-[17.5px] leading-[1.6] text-[rgba(14,23,21,0.62)] max-[720px]:text-[16px]">
                {innerData.dek}
              </p>
            )}
          </Reveal>

          {author?.name && (
            <Reveal>
              <div className="mt-10 flex items-center gap-3.5 border-t border-[rgba(14,23,21,0.16)] pt-7">
                {authorImage?.url && (
                  <Image
                    src={authorImage.url}
                    alt={authorImage.alt || author.name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-[15px] font-medium leading-tight text-[#0E1715]">
                    {author.name}
                  </p>
                  {author.designation && (
                    <p className="mt-1 text-[13px] leading-tight text-[rgba(14,23,21,0.62)]">
                      {author.designation}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {featuredImage?.url && (
          <Reveal>
            <figure className="mt-14 max-[720px]:mt-10">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || innerData?.title || 'Article image'}
                width={featuredImage.width || 1600}
                height={featuredImage.height || 900}
                className="h-auto w-full rounded-2xl object-cover"
                sizes="(max-width: 1240px) 100vw, 1176px"
                priority
              />
            </figure>
          </Reveal>
        )}
      </div>
    </header>
  );
}
