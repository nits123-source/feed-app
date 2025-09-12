interface SendIconProps {
  size?: number
  color?: string
  className?: string
}

export function SendIcon({ size = 16, color = "currentColor", className = "" }: SendIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
    >
      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11z"/>
    </svg>
  )
}
