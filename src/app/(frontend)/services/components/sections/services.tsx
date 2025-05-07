import { servicesSections } from './constants'

export function Services() {
  return (
    <section className="mt-24">
      <div className="container grid grid-cols-3 gap-6">
        {servicesSections.map((item) => {
          return (
            <div
              key={item.id}
              className={`bg-primary-100 hover:bg-primary-200 pt-20 pb-24 px-14 rounded-3xl ${(item.id === 2 || item.id === 5) && 'relative top-11'}`}
            >
              <p className="text-2xl leading-8 font-bold text-center">{item.title}</p>
              <p className="text-lg font-normal leading-7 text-primary-400 mt-10 text-center">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
