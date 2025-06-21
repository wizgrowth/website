'use client'

import { useEffect } from 'react'

type FloatingMenuProps = {
  data: {
    title: string
    titleId: string
  }
}

export function FloatingMenuItem({ data }: FloatingMenuProps) {
  useEffect(() => {
    let currentActiveId: string | null | undefined = null

    window?.addEventListener('scroll', () => {
      let newActiveId: string | null | undefined = null

      document
        .querySelectorAll(
          '.payload-richtext h2,.payload-richtext h3,.payload-richtext h4,.payload-richtext h5,.payload-richtext h6',
        )
        .forEach((item) => {
          if (item.getBoundingClientRect().top < window.innerHeight) {
            newActiveId = item?.getAttribute('id')
          }
        })

      if (newActiveId && newActiveId !== currentActiveId) {
        currentActiveId = newActiveId

        document.querySelectorAll('#blog-floating-menu a').forEach((link) => {
          link.classList.remove('active')

          if (link.getAttribute('href') === `#${newActiveId}`) {
            link.classList.add('active')
          }
        })
      }
    })
  }, [])

  return (
    <a className="pl-2 rounded-sm hover:bg-primary-200" href={`#${data.titleId}`}>
      {data.title}
    </a>
  )
}
