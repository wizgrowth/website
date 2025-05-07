type iconProps = {
  className?: string
  width?: string
  height?: string
}

export function TickIcon({ className = '', width = '21', height = '21' }: iconProps) {
  return (
    <div className={className}>
      <svg width={width} height={height} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M871.696 166.932l-526.088 526.088-193.304-193.304c-9.372-9.372-24.568-9.372-33.942 0l-56.568 56.568c-9.372 9.372-9.372 24.568 0 33.942l266.842 266.842c9.372 9.372 24.568 9.372 33.942 0l599.626-599.626c9.372-9.372 9.372-24.568 0-33.942l-56.568-56.568c-9.372-9.372-24.568-9.372-33.94 0z"></path>
      </svg>
    </div>
  )
}
