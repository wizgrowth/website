import type { BlogInner } from '@/payload-types';
import { Reveal } from '../reveal';

type TldrProps = {
  innerData: BlogInner;
};

export function Tldr({ innerData }: TldrProps) {
  const points = innerData?.tldr;
  if (!points || points.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
      <Reveal>
        <aside className="mt-16 max-w-[76ch] rounded-2xl border border-[rgba(14,23,21,0.16)] bg-[rgba(20,53,42,0.04)] p-9 max-[720px]:mt-12 max-[720px]:p-6">
          <p className="mb-5 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11.5px] font-medium uppercase tracking-[0.14em] text-[#C66B2D]">
            The short version
          </p>
          <ul className="flex flex-col gap-4">
            {points.map((point) => (
              <li
                key={point.id ?? point.text}
                className="grid grid-cols-[auto_1fr] gap-3.5 text-[15.5px] leading-[1.6] text-[rgba(14,23,21,0.82)]"
              >
                <span aria-hidden="true" className="mt-[9px] h-1 w-1 rounded-full bg-[#C66B2D]" />
                <span>
                  {point.label && (
                    <strong className="font-semibold text-[#0E1715]">{point.label} </strong>
                  )}
                  {point.text}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </div>
  );
}
