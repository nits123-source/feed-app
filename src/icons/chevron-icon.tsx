interface ChevronIconProps {
  direction?: 'up' | 'down' | 'left' | 'right'
  size?: number
  className?: string
}

const ChevronIcon = ({ direction = 'down', size = 24, className = '' }: ChevronIconProps) => {
  const getRotation = () => {
    switch (direction) {
      case 'up':
        return 'rotate-180'
      case 'left':
        return 'rotate-90'
      case 'right':
        return '-rotate-90'
      default:
        return ''
    }
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={`flex-shrink-0 ${getRotation()} ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  )
}

export default ChevronIcon
