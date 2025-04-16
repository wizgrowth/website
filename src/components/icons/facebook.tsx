type iconProps = {
  className?: string
  width?: string
  height?: string
}

export function FaceBookIcon({ className = '', width = '21', height = '21' }: iconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <path d="M20,10.1c0-5.5-4.5-10-10-10S0,4.5,0,10.1c0,5,3.7,9.1,8.4,9.9v-7H5.9v-2.9h2.5V7.9C8.4,5.4,9.9,4,12.2,4c1.1,0,2.2,0.2,2.2,0.2v2.5h-1.3c-1.2,0-1.6,0.8-1.6,1.6v1.9h2.8L13.9,13h-2.3v7C16.3,19.2,20,15.1,20,10.1z"></path>
    </svg>
  )
}
