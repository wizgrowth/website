type BlogInnerPageProps = {
  slug: string
}

type ParamsProps = {
  params: Promise<BlogInnerPageProps>
}

export default async function BlogInnerPage({ params }: ParamsProps) {
  const { slug } = await params
  console.log(slug)
  return <section className="mt-40">{slug}</section>
}
