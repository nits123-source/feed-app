interface OrderedListIconProps {
  size?: number
  color?: string
  className?: string
}

export function OrderedListIcon({ size = 16, color = "currentColor", className = "" }: OrderedListIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <text x="2" y="5" fontSize="10" fill="currentColor">1.</text>
      <text x="2" y="9" fontSize="10" fill="currentColor">2.</text>
      <text x="2" y="13" fontSize="10" fill="currentColor">3.</text>
      <path d="M5 4h9M5 8h9M5 12h9"/>
    </svg>
  )
}
