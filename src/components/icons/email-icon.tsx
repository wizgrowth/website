type iconProps = {
  className?: string
  width?: string
  height?: string
}

export function EmailIcon({ className = '', width = '21', height = '21' }: iconProps) {
  return (
    <div className={className}>
      <svg width={width} height={height} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10h5v-2h-5c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8v1.5c0,0.8-0.7,1.5-1.5,1.5S15,12.3,15,11.5V10c0-2.7-2.3-5-5-5s-5,2.3-5,5s2.3,5,5,5c1.4,0,2.7-0.6,3.6-1.6c0.6,0.9,1.7,1.6,2.9,1.6c1.9,0,3.5-1.6,3.5-3.5V10C20,4.5,15.5,0,10,0zM10,7c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S8.3,7,10,7z"></path>
      </svg>
    </div>
  )
}
