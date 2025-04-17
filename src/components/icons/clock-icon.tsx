type iconProps = {
  className?: string
  width?: string
  height?: string
}

export function ClockIcon({ className = '', width = '21', height = '21' }: iconProps) {
  return (
    <div className={className}>
      <svg width={width} height={height} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M10,18.2c-4.5,0-8.2-3.7-8.2-8.2c0-4.5,3.7-8.2,8.2-8.2c4.5,0,8.2,3.7,8.2,8.2C18.2,14.5,14.5,18.2,10,18.2z M14.4,12.2c-0.2,0.3-0.5,0.5-0.8,0.5c-0.1,0-0.3,0-0.4-0.1l-3.6-1.8c-0.3-0.2-0.5-0.5-0.5-0.8V4.5C9.1,4,9.5,3.6,10,3.6s0.9,0.4,0.9,0.9v4.9L14,11C14.5,11.2,14.7,11.8,14.4,12.2z"></path>
      </svg>
    </div>
  )
}
