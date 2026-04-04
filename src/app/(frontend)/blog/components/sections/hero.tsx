export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-500 pt-28 pb-36 max-lg:pt-24 max-lg:pb-28 max-sm:pt-16 max-sm:pb-24">
      {/* Layered mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% -30%, rgba(10,105,81,0.7), transparent)',
            'radial-gradient(ellipse 50% 50% at 85% 70%, rgba(54,89,81,0.5), transparent)',
            'radial-gradient(ellipse 40% 40% at 10% 90%, rgba(167,243,208,0.06), transparent)',
          ].join(', '),
        }}
      />

      {/* Decorative ring — top left */}
      <div className="pointer-events-none absolute top-10 left-[7%] max-lg:hidden">
        <div className="h-28 w-28 rounded-full border border-white/[0.06]" />
        <div className="absolute inset-3 rounded-full border border-dashed border-white/[0.04]" />
      </div>

      {/* Decorative cross — top right */}
      <div className="pointer-events-none absolute top-20 right-[11%] max-lg:hidden">
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Scattered dots */}
      <div className="pointer-events-none absolute bottom-24 left-[14%] h-1.5 w-1.5 rounded-full bg-emerald-400/25 max-sm:hidden" />
      <div className="pointer-events-none absolute top-[30%] right-[18%] h-2.5 w-2.5 rounded-full bg-emerald-300/15 max-sm:hidden" />
      <div className="pointer-events-none absolute bottom-[35%] right-[8%] h-1 w-1 rounded-full bg-white/20 max-sm:hidden" />
      <div className="pointer-events-none absolute top-[55%] left-[5%] h-2 w-2 rounded-full bg-white/[0.07] max-sm:hidden" />

      {/* Subtle diagonal lines */}
      <div
        className="pointer-events-none absolute top-0 right-[22%] h-full w-px origin-top max-lg:hidden"
        style={{
          background:
            'linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.03) 50%, transparent 90%)',
          transform: 'rotate(18deg)',
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-[28%] h-full w-px origin-top max-lg:hidden"
        style={{
          background:
            'linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.025) 50%, transparent 90%)',
          transform: 'rotate(-14deg)',
        }}
      />

      {/* Content */}
      <div className="container relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-white/[0.05] px-5 py-2 text-[13px] font-medium tracking-[0.15em] text-emerald-300 uppercase backdrop-blur-sm max-sm:mb-5 max-sm:px-4 max-sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Insights &amp; Resources
          </span>

          <h1 className="mb-7 max-sm:mb-5">
            <span className="block text-base font-medium tracking-[0.35em] text-white/30 uppercase max-sm:text-sm max-sm:tracking-[0.25em]">
              The
            </span>
            <span
              className="mt-2 block text-[5.5rem] leading-none font-extrabold tracking-tight max-lg:text-7xl max-sm:text-[2.75rem]"
              style={{
                background: 'linear-gradient(135deg, #fff 0%, #a7f3d0 40%, #6ee7b7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              WizGrowth
            </span>
            <span className="mt-1 block text-[5.5rem] leading-none font-extrabold tracking-tight text-white/90 max-lg:text-7xl max-sm:text-[2.75rem]">
              Blog
            </span>
          </h1>

          {/* Diamond divider */}
          <div className="mb-7 flex items-center gap-3 max-sm:mb-5">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-emerald-400/40 max-sm:w-10" />
            <div className="h-2 w-2 rotate-45 border border-emerald-400/40" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-emerald-400/40 max-sm:w-10" />
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="pointer-events-none absolute -bottom-px left-0 w-full">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full h-auto"
          preserveAspectRatio="none"
        >
          <path d="M0 50C320 85 560 90 720 70C880 50 1120 15 1440 35V90H0V50Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
