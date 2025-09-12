interface UnorderedListIconProps {
  size?: number
  color?: string
  className?: string
}

export function UnorderedListIcon({ size = 16, color = "currentColor", className = "" }: UnorderedListIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <circle cx="2" cy="4" r="1"/>
      <circle cx="2" cy="8" r="1"/>
      <circle cx="2" cy="12" r="1"/>
      <path d="M5 4h9M5 8h9M5 12h9"/>
    </svg>
  )
}
