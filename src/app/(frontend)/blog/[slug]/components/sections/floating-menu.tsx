type FloatingMenuProps = {
  data: {
    title: string
    titleId: string
  }
}

export function FloatingMenu({ data }: FloatingMenuProps) {
  return (
    <div>
      <a href={`#${data.titleId}`}>{data.title}</a>
    </div>
  )
}
