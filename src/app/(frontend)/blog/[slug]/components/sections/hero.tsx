import Image from 'next/image'
import { BlogPost } from './types'
import { ClockIcon } from '@/components/icons/clock-icon'

type HeroProps = {
  innerData: BlogPost
}

export function Hero({ innerData }: HeroProps) {
  return (
    <section>
      <div className="container mt-40  rounded-[20px] border border-solid border-slate-200 bg-gradient-to-r from-[#e0f2fe99] to-primary-200  p-8 pl-12 max-sm:px-5">
        <div className="flex items-center gap-12 max-lg:flex-col">
          <div className="w-full lg:basis-[55%] xl:basis-[60%]">
            {innerData?.category?.length > 0 && (
              <p className="rounded-[40px] bg-gradient-to-r from-orange-200 to-rose-200 px-4 py-1 text-lg leading-7 font-bold text-slate-700 max-sm:text-base max-sm:leading-6 w-fit uppercase">
                {innerData.category[0]}
              </p>
            )}
            {innerData?.title && (
              <h1 className="mb-9 text-4xl leading-10 font-bold text-slate-800 max-sm:text-3xl max-sm:leading-9 mt-6">
                {innerData.title}
              </h1>
            )}
            <div className="flex max-xl:flex-col max-xl:gap-4">
              <div className="group flex items-center gap-3 border-solid border-slate-300 xl:border-r xl:pr-10">
                {innerData?.publishedBy?.profilePicture?.url && (
                  <Image
                    src={innerData.publishedBy.profilePicture.url}
                    alt={innerData.publishedBy.profilePicture.alt || 'author profile picture'}
                    width="44"
                    height="44"
                    className="rounded-[10px] object-cover h-full"
                  />
                )}
                <div>
                  <p className="text-base leading-6 text-slate-900 max-sm:text-base max-sm:leading-5 font-normal">
                    Article written by
                  </p>
                  {innerData?.publishedBy?.name && (
                    <p className="text-lg leading-6 font-medium text-black max-sm:text-base max-sm:leading-5 group-hover:underline">
                      {innerData.publishedBy.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-9 text-slate-500 xl:pl-10">
                {innerData?.readingTime && (
                  <div className="flex items-center gap-2">
                    <ClockIcon width="20" height="20" className="stroke-1  fill-slate-400" />
                    <p>{innerData.readingTime}</p>
                  </div>
                )}
                <p className="text-sm leading-6 text-slate-500 uppercase max-sm:text-xs">
                  {innerData?.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-shrink-0 justify-end max-lg:justify-center lg:basis-[45%] xl:basis-[40%]">
            {innerData?.featuredImage?.url && (
              <Image
                src={innerData.featuredImage.url}
                alt={innerData?.featuredImage?.alt}
                width={279}
                height={428}
                className="h-[279px] w-[428px] max-w-full rounded-xl object-cover max-lg:h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
