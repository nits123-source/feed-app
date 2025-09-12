// HTML entity encoding to prevent XSS
const htmlEntities: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

// Sanitize HTML content to prevent XSS
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input.replace(/[&<>"'`=\/]/g, (char) => htmlEntities[char] || char)
}

// Sanitize user input (removes dangerous characters and normalizes)
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .trim() // Remove leading/trailing whitespace
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .replace(/script/gi, '') // Remove script tags
    .replace(/iframe/gi, '') // Remove iframe tags
    .replace(/object/gi, '') // Remove object tags
    .replace(/embed/gi, '') // Remove embed tags
    .replace(/link/gi, '') // Remove link tags
    .replace(/meta/gi, '') // Remove meta tags
    .replace(/style/gi, '') // Remove style tags
    .replace(/expression/gi, '') // Remove CSS expressions
    .replace(/url\(/gi, '') // Remove CSS url() functions
    .replace(/@import/gi, '') // Remove CSS imports
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/mocha:/gi, '') // Remove mocha: protocol
    .replace(/livescript:/gi, '') // Remove livescript: protocol
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
}

// Sanitize email input
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return ''
  
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '') // Only allow alphanumeric, @, ., _, -
    .substring(0, 254) // Email length limit
}

// Sanitize name input
export const sanitizeName = (name: string): string => {
  if (typeof name !== 'string') return ''
  
  return name
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[^\w\s.-]/g, '') // Only allow word characters, spaces, dots, hyphens
    .substring(0, 100) // Name length limit
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
}

// Sanitize password input
export const sanitizePassword = (password: string): string => {
  if (typeof password !== 'string') return ''
  
  return password
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
}

// Sanitize post content
export const sanitizePostContent = (content: string): string => {
  if (typeof content !== 'string') return ''
  
  return content
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/script/gi, '') // Remove script tags
    .replace(/iframe/gi, '') // Remove iframe tags
    .replace(/object/gi, '') // Remove object tags
    .replace(/embed/gi, '') // Remove embed tags
    .replace(/expression/gi, '') // Remove CSS expressions
    .replace(/url\(/gi, '') // Remove CSS url() functions
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/\0/g, '') // Remove null bytes
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control characters
    .substring(0, 1000) // Content length limit
}

// Validate email format
export const isValidEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254
}

// Validate password strength
export const isValidPassword = (password: string): boolean => {
  if (typeof password !== 'string') return false
  
  return password.length >= 6 && password.length <= 128
}

// Validate name
export const isValidName = (name: string): boolean => {
  if (typeof name !== 'string') return false
  
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 100
}
