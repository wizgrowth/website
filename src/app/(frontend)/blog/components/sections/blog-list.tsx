import { getPayload } from 'payload';
import config from '@payload-config';
import Image from 'next/image';

const payload = await getPayload({ config });

const blogListData = await payload.find({
  collection: 'blogInner',
  depth: 2,
  limit: 200,
  sort: '-createdAt', // sort by most recent
  select: {
    title: true,
    slug: true,
    category: true,
    readingTime: true,
    publishedBy: true,
    featuredImage: true,
    createdAt: true,
  },
});

console.log('blogListData', blogListData);

export function BlogList() {
  return (
    <section className="mt-20 mb-28 max-sm:mt-16">
      <div className="container">
        <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
          {blogListData.docs.map((item: any) => {
            return (
              <a
                href={item.slug}
                key={item.id}
                className="border border-slate-200 p-5 rounded-lg bg-primary-200 hover:bg-primary-100 hover:border-primary-400 transition duration-300 flex flex-col"
              >
                <Image
                  src={
                    item?.featuredImage?.url ||
                    'https://ibffbzwoucksfljolszp.supabase.co/storage/v1/object/public/wizgrowth-assets/blog-inner/blog-default-thumbnail.png'
                  }
                  alt={item.title || 'Blog feature image'}
                  width={500}
                  height={300}
                  className="rounded-xl w-full h-60 max-lg:h-40 max-md:h-60 max-sm:w-96 max-sm:mx-auto"
                />

                {Array.isArray(item?.category) && item.category.length > 0 && (
                  <p className="rounded-full bg-gradient-to-r from-orange-200 to-rose-200 px-4 py-1 text-sm leading-5 font-bold text-slate-700 w-fit uppercase my-5">
                    {item.category?.[0]}
                  </p>
                )}
                <p className="text-2xl leading-snug font-medium text-black max-sm:text-xl">
                  {item?.title}
                </p>
                <div className="flex items-center justify-between mt-auto pt-10">
                  {typeof item.createdAt === 'string' && item?.createdAt && (
                    <p className="text-sm leading-5 font-medium text-slate-500 uppercase">
                      {item.createdAt.slice(0, 10)}
                    </p>
                  )}
                  <p>{item?.readingTime}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
