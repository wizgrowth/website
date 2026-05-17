const specs = [
  { num: '12', label: 'Weeks · Live cohort' },
  { num: '7', label: 'Pillar modules' },
  { num: '6–8h', label: 'Per week commitment' },
  { num: '20', label: 'Founding cohort cap' },
  { num: '1:1', label: 'Reviews with Vismaya' },
] as const;

export function SpecsStrip() {
  return (
    <div className="border-t border-[rgba(244,238,226,0.14)] bg-[#0E1715] py-12 text-[#F4EEE2]">
      <div className="mx-auto max-w-[1240px] px-8 max-[720px]:px-[22px]">
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-5 lg:gap-y-0">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 lg:px-7 ${i < specs.length - 1 ? 'lg:border-r lg:border-[rgba(244,238,226,0.14)]' : ''}`}
            >
              <div className="font-[family-name:var(--font-fraunces),Georgia,serif] text-[44px] font-medium leading-none tracking-[-0.025em] text-[#C66B2D] [font-variation-settings:'opsz'_144,'SOFT'_30]">
                {s.num}
              </div>
              <div className="mt-2 font-[family-name:var(--font-geist-mono),ui-monospace,Menlo,monospace] text-[11px] uppercase tracking-[0.14em] text-[rgba(244,238,226,0.62)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
