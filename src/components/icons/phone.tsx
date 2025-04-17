type iconProps = {
  className?: string
  width?: string
  height?: string
}

export function PhoneIcon({ className = '', width = '21', height = '21' }: iconProps) {
  return (
    <div className={className}>
      <svg width={width} height={height} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M13.5,20H6.5c-1.6,0-2.9-1.3-2.9-2.9V2.9C3.5,1.3,4.8,0,6.5,0h7.1c1.6,0,2.9,1.3,2.9,2.9v14.1C16.5,18.7,15.2,20,13.5,20zM6.7,1.7C5.8,1.7,5,2.5,5,3.4v13.2c0,0.9,0.7,1.7,1.7,1.7h6.6c0.9,0,1.7-0.7,1.7-1.7V3.4c0-0.9-0.7-1.7-1.7-1.7H6.7z"></path>
        <path d="M11.2,4.4H8.8c-0.3,0-0.6-0.3-0.6-0.6s0.3-0.6,0.6-0.6h2.4c0.3,0,0.6,0.3,0.6,0.6S11.5,4.4,11.2,4.4z"></path>
        <circle cx="10" cy="15.7" r="1.2"></circle>
      </svg>
    </div>
  )
}
