import { BlogPost } from './types'

type HeroProps = {
  innerData: BlogPost
}

export function Hero({ innerData }: HeroProps) {
  console.log(innerData, 'Hero Component Data')
  return (
    <section className=" pt-20 pb-40 relative">
      <div className="container">
        <h1 className="mb-3 text-6xl leading-16 font-bold text-slate-900 max-lg:text-5xl max-sm:text-4xl max-sm:leading-tight text-center">
          WizGrowth Blog&apos;s
        </h1>
        <div
          className="w-full h-40 opacity-45 absolute bottom-0 left-0"
          style={{
            background:
              'linear-gradient(180deg,rgba(42, 155, 78, 0) 0%, rgba(87, 199, 133, 0.48) 100%, rgba(237, 221, 83, 0) 0%)',
          }}
        />
      </div>
    </section>
  )
}
