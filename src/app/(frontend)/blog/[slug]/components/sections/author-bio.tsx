import Image from 'next/image';
import type { BlogInner } from '@/payload-types';
import { Reveal } from '../reveal';

type AuthorBioProps = {
  innerData: BlogInner;
};

export function AuthorBio({ innerData }: AuthorBioProps) {
  const author =
    innerData?.publishedBy && typeof innerData.publishedBy === 'object'
      ? innerData.publishedBy
      : null;

  if (!author?.name || !author?.description) return null;

  const authorImage =
    author.profilePicture && typeof author.profilePicture === 'object'
      ? author.profilePicture
      : null;

  const socials = [
    { label: 'LinkedIn', href: author.socialMedia?.linkedIn },
    { label: 'X', href: author.socialMedia?.twitter },
    { label: 'Instagram', href: author.socialMedia?.instagram },
  ].filter((social): social is { label: string; href: string } => Boolean(social.href));

  return (
    <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
      <Reveal>
        <aside className="max-w-[76ch] border-t border-[rgba(14,23,21,0.16)] pt-12">
          <p className="mb-7 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[rgba(14,23,21,0.62)]">
            Written by
          </p>
          <div className="flex items-start gap-6 max-[560px]:flex-col max-[560px]:gap-5">
            {authorImage?.url && (
              <Image
                src={authorImage.url}
                alt={authorImage.alt || author.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] flex-shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[23px] font-medium leading-tight tracking-[-0.015em] text-[#0E1715] [font-variation-settings:'opsz'_60,'SOFT'_20]">
                {author.name}
              </p>
              {author.designation && (
                <p className="mt-1.5 text-[13.5px] leading-tight text-[rgba(14,23,21,0.62)]">
                  {author.designation}
                </p>
              )}
              <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.65] text-[rgba(14,23,21,0.82)]">
                {author.description}
              </p>
              {socials.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#14352A] underline decoration-[rgba(198,107,45,0.55)] underline-offset-4 hover:decoration-[#C66B2D]"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}
