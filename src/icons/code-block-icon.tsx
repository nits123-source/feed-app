interface CodeBlockIconProps {
  size?: number
  color?: string
  className?: string
}

export function CodeBlockIcon({ size = 16, color = "currentColor", className = "" }: CodeBlockIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      className={className}
    >
      <path d="M2 2h12v12H2V2zm1 1v10h10V3H3zm2 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"/>
    </svg>
  )
}
