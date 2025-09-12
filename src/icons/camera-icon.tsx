interface CameraIconProps {
  size?: number
  color?: string
  className?: string
}

export function CameraIcon({ size = 16, color = "currentColor", className = "" }: CameraIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879L9.828 3.172A3 3 0 0 0 7.656 2H4a1 1 0 0 0-1 1v1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM3 4h4.828a1 1 0 0 1 .707.293L9.172 5.5a1 1 0 0 0 .707.293H14v6H2V4h1z"/>
      <circle cx="8" cy="8" r="2.5"/>
    </svg>
  )
}
