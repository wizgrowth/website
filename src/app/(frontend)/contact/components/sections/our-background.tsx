import { TickIcon } from '@/components/icons/tick-icon'
import { number } from 'yup'

export function OurBackground() {
  const data = [
    {
      id: 1,
      title: 'Digital Marketing Services',
    },
    {
      id: 2,
      title: 'Website Development',
    },
    {
      id: 3,
      title: 'Web Designing',
    },
  ]

  const backgroundData = [
    {
      id: 1,
      number: 250,
      title: 'Our approach',
      description: 'We craft data-driven strategies that deliver real results for your brand.',
    },
    {
      id: 2,
      number: 400,
      title: 'How We Work',
      description: 'Deliver real, impactful results for your brand.',
    },
  ]

  return (
    <section className="pb-20">
      <div className="container flex items-start justify-between gap-10">
        <div>
          <h2 className="text-4xl leading-tight font-extrabold">Few words about our background</h2>
          <p className="text-base leading-7 font-normal text-primary-300 mt-5 mb-7">
            With over 10 years of experience, we specialize in delivering result-driven digital
            marketing solutions, including SEO, PPC, and social media, to help businesses grow
            online.
          </p>
          {data.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-4 mb-3">
                <TickIcon className="text-primary-400 stroke-primary-400" width="15" height="15" />
                <p className="text-base leading-7 font-normal text-primary-300">{item.title}</p>
              </div>
            )
          })}
        </div>
        <div className="flex items-start gap-12">
          {backgroundData.map((item) => {
            return (
              <div key={item.id}>
                <p className="p-11 bg-primary-200 text-4xl font-bold leading-tight text-primary-400 w-fit rounded-3xl">
                  {item.number}
                </p>
                <p className="text-lg font-bold leading-7 mt-9">{item.title}</p>
                <p className="text-base font-normal leading-7 text-primary-300 mt-5">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
