import { servicesSections } from './constants'

export function Services() {
  return (
    <section className="mt-24 max-md:mt-16">
      <div className="container grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {servicesSections.map((item) => {
          return (
            <div
              key={item.id}
              className={`bg-primary-100 hover:bg-primary-200 pt-20 pb-24 px-14 rounded-3xl max-sm:py-10 max-xs:px-10 ${(item.id === 2 || item.id === 5) && 'relative top-11 max-lg:top-0'}`}
            >
              <p className="text-2xl leading-8 font-bold text-center">{item.title}</p>
              <p className="text-lg font-normal leading-7 text-primary-400 mt-10 text-center max-sm:mt-5">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
