type iconProps = {
  className?: string
  width?: string
  height?: string
}

export function LocationIcon({ className = '', width = '21', height = '21' }: iconProps) {
  return (
    <div className={className}>
      <svg width={width} height={height} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10,0C6.1,0,3,3.1,3,7c0,4.5,6,11.8,6.2,12.1L10,20l0.8-0.9C11,18.8,17,11.5,17,7C17,3.1,13.9,0,10,0z M10,2c2.8,0,5,2.2,5,5c0,2.7-3.1,7.4-5,9.8C8.1,14.4,5,9.7,5,7C5,4.2,7.2,2,10,2zM10,4.5C8.6,4.5,7.5,5.6,7.5,7S8.6,9.5,10,9.5s2.5-1.1,2.5-2.5S11.4,4.5,10,4.5z"></path>
      </svg>
    </div>
  )
}
