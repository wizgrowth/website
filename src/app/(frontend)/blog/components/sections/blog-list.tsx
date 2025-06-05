import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { BlogPost } from './types'

const payload = await getPayload({ config })

const blogListData = await payload.find({
  collection: 'blogInner',
  depth: 2,
  sort: '-createdAt', // sort by most recent
  select: {
    title: true,
    slug: true,
    category: true,
    readingTime: true,
    publishedBy: true,
    featuredImage: true,
  },
})

function convertToIsoDate(isoDate: string) {
  const date = new Date(isoDate)
  const readableDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  console.log(readableDate, 'Converted Date')
  return readableDate
}

export function BlogList() {
  return (
    <section className="mt-20 mb-28">
      <div className="container">
        <div className="grid grid-cols-3 gap-5">
          {blogListData.docs.map((item: BlogPost) => {
            return (
              <a
                href={item.slug}
                key={item.id}
                className="border border-slate-200 p-5 rounded-lg bg-primary-200 hover:bg-primary-100 transition duration-300"
              >
                {typeof item.featuredImage === 'object' && item.featuredImage?.url && (
                  <Image
                    src={item?.featuredImage?.url}
                    alt={item.title || 'Blog feature image'}
                    width={500}
                    height={300}
                    className="rounded-3xl"
                  />
                )}
                {Array.isArray(item?.category) && item.category.length > 0 && (
                  <p className="rounded-full bg-gradient-to-r from-orange-200 to-rose-200 px-4 py-1 text-sm leading-5 font-bold text-slate-700 w-fit uppercase my-5">
                    {item.category?.[0]}
                  </p>
                )}
                <p className="text-2xl leading-snug font-medium text-black max-sm:text-xl">
                  {item?.title}
                </p>
                <div className="flex items-center justify-between mt-10">
                  {typeof item.publishedBy === 'object' && item?.publishedBy?.createdAt && (
                    <p className="text-sm leading-5 font-medium text-slate-500 uppercase">
                      {convertToIsoDate(item.publishedBy.createdAt)}
                    </p>
                  )}
                  <p>{item?.readingTime}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
