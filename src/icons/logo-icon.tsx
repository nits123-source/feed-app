const LogoIcon = () => {
  return (
    <svg 
      width="32" 
      height="24" 
      viewBox="0 0 32 24" 
      className="flex-shrink-0"
    >
      {/* Oval shape with black outline and white fill */}
      <ellipse 
        cx="16" 
        cy="12" 
        rx="14" 
        ry="10" 
        fill="white" 
        stroke="black" 
        strokeWidth="2"
      />
      
      {/* Horizontal dash positioned slightly to the right of center */}
      <rect 
        x="18" 
        y="10" 
        width="8" 
        height="4" 
        fill="black" 
        rx="2"
      />
    </svg>
  )
}

export default LogoIcon
