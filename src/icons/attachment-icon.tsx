interface AttachmentIconProps {
  size?: number
  color?: string
  className?: string
}

export function AttachmentIcon({ size = 16, color = "currentColor", className = "" }: AttachmentIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="2"
      className={className}
    >
      <path d="M8 2v12M2 8h12"/>
    </svg>
  )
}
