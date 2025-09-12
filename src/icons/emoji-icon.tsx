interface EmojiIconProps {
    size?: number
    color?: string
    className?: string
  }
  
  export function EmojiIcon({ size = 24, color = "#6B7280", className = "" }: EmojiIconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Outer circle for face */}
        <circle cx="12" cy="12" r="10" />
  
        {/* Left eye */}
        <circle cx="9" cy="9" r="1" fill={color} />
  
        {/* Right eye */}
        <circle cx="15" cy="9" r="1" fill={color} />
  
        {/* Smile */}
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
    )
  }
  