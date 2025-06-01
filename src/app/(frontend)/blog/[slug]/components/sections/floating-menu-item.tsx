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
        .querySelectorAll('.payload-richtext h2 a, h3 a, h4 a, h5 a, h6 a')
        .forEach((item) => {
          if (item.getBoundingClientRect().top < window.innerHeight) {
            newActiveId = item.parentElement?.getAttribute('id')
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
    <a className="pl-2 rounded-sm" href={`#${data.titleId}`}>
      {data.title}
    </a>
  )
}
