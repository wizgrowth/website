import { Button } from '@/components/buttons/button'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="py-5 pt-36">
      <div className="container flex justify-center items-center gap-14">
        <div className="basis-1/2 max-lg:basis-full">
          <p className="text-sm font-bold leading-6 text-primary-400 uppercase max-lg:text-center">
            Welcome
          </p>
          <h1 className="text-5xl font-bold leading-snug mt-3 max-lg:text-center max-sm:text-4xl max-sm:leading-normal text-balance">
            India’s Leading Digital Marketing Agency
          </h1>
          <p className="text-xl leading-8 text-primary-300 mt-9 max-lg:text-center">
            With 10 years of experience we help businesses grow through SEO, social media, content
            marketing and paid campaigns. As a marketing agency we focus on delivering measurable
            results for you.
          </p>
          <Button
            className="py-3 px-8 bg-primary-400 text-white rounded-lg mt-8 text-lg font-bold block w-fit max-lg:mx-auto"
            Btntext="Book Demo"
            href="#book-demo"
          />
        </div>
        <div className="basis-1/2 bg-primary-700 rounded-3xl max-lg:hidden">
          <div className="px-16 -mt-9">
            <Image
              src="https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/front-page/wizgrowth-hero.png"
              width={561}
              height={702}
              alt="Hero image"
              title="Hero image"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
