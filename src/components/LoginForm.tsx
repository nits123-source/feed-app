import { useState, useEffect } from 'react'
import type { User } from '../types'
import { getUsers, setCurrentUser, saveUser } from '../utils/localStorage'
import { 
  sanitizeEmail, 
  sanitizeName, 
  sanitizePassword,
  isValidEmail, 
  isValidPassword
} from '../utils/sanitize'
import { LoginIcon } from '../icons/login-icon'

interface LoginFormProps {
  onLogin: (user: User) => void
  onClose?: () => void
}

interface FormData {
  email: string
  password: string
  repeatPassword: string
}

const LoginForm = ({ onLogin, onClose }: LoginFormProps) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')

  const defaultTestUsers = [
    { email: 'demo@example.com', password: 'password123', name: 'Demo User' },
    { email: 'test@user.com', password: 'testpass', name: 'Test User' }
  ]

  // Initialize default users in localStorage if they don't exist
  useEffect(() => {
    const existingUsers = getUsers()
    const existingEmails = existingUsers.map(user => user.email)
    
    // Add default test users if they don't exist
    defaultTestUsers.forEach(testUser => {
      if (!existingEmails.includes(testUser.email)) {
        const newUser: User = {
          id: testUser.email,
          name: sanitizeName(testUser.name),
          email: sanitizeEmail(testUser.email),
          password: sanitizePassword(testUser.password)
        }
        saveUser(newUser)
      }
    })
  }, [])

  // Clear all form state
  const clearFormState = () => {
    setFormData({ email: '', password: '', repeatPassword: '' })
    setEmailError('')
    setPasswordError('')
    setLoginError('')
    setShowPassword(false)
    setShowRepeatPassword(false)
  }

  // Handle switching between login and signup
  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp)
    clearFormState()
  }

  // Check if form is valid
  const isFormValid = (): boolean => {
    if (isSignUp) {
      return isValidEmail(formData.email) && 
             isValidPassword(formData.password) &&
             formData.password === formData.repeatPassword &&
             emailError === '' &&
             passwordError === ''
    } else {
      return isValidEmail(formData.email) && 
             isValidPassword(formData.password) &&
             emailError === ''
    }
  }

  // Handle email change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawEmail = e.target.value
    const sanitizedEmail = sanitizeEmail(rawEmail)
    
    setFormData({ ...formData, email: sanitizedEmail })
    setLoginError('')
    
    if (sanitizedEmail.trim() !== '' && !isValidEmail(sanitizedEmail)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPassword = e.target.value
    const sanitizedPassword = sanitizePassword(rawPassword)
    
    setFormData({ ...formData, password: sanitizedPassword })
    setLoginError('')
    setPasswordError('')
  }

  // Handle repeat password change
  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPassword = e.target.value
    const sanitizedPassword = sanitizePassword(rawPassword)
    
    setFormData({ ...formData, repeatPassword: sanitizedPassword })
    setPasswordError('')
    
    if (sanitizedPassword !== formData.password && sanitizedPassword.trim() !== '') {
      setPasswordError('Passwords do not match')
    }
  }

  // Extract username from email (part before @)
  const getUsernameFromEmail = (email: string): string => {
    const username = email.split('@')[0]
    return sanitizeName(username)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) return
    
    // Sanitize all inputs before processing
    const sanitizedFormData = {
      email: sanitizeEmail(formData.email),
      password: sanitizePassword(formData.password)
    }
    
    if (isSignUp) {
      // Check if user already exists
      const existingUsers = getUsers()
      const userExists = existingUsers.find(user => user.email === sanitizedFormData.email)
      
      if (userExists) {
        setLoginError('User with this email already exists. Please login instead.')
        return
      }
      
      // Create new user with email as name
      const newUser: User = {
        id: Date.now().toString(),
        name: getUsernameFromEmail(sanitizedFormData.email),
        email: sanitizedFormData.email,
        password: sanitizedFormData.password
      }
      
      saveUser(newUser)
      setCurrentUser(newUser)
      onLogin(newUser)
      clearFormState()
      if (onClose) onClose()
    } else {
      const users = getUsers()
      const user = users.find(u => u.email === sanitizedFormData.email)
      
      if (!user) {
        setLoginError('User is not registered. Please sign up first.')
        return
      }
      
      // Check password
      if (user.password !== sanitizedFormData.password) {
        setLoginError('Invalid password. Please try again.')
        return
      }
      
      // Login successful
      const userToLogin: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
      }
      setCurrentUser(userToLogin)
      onLogin(userToLogin)
      clearFormState()
      if (onClose) onClose()
    }
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-4 rounded-2xl">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <LoginIcon />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-black text-center mb-2">
          {isSignUp ? 'Create an account to continue' : 'Sign in to continue'}
        </h1>
        
        <p className="text-gray-500 text-center mb-8">
          {isSignUp ? 'Create an account to access all the features on this app' : 'Sign in to access all the features on this app'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email or username
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black ${
                emailError 
                  ? 'focus:ring-red-500 border-red-300' 
                  : 'focus:ring-blue-500'
              }`}
              placeholder="Enter your email or username"
              maxLength={254}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter your password"
                maxLength={128}
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Repeat password
              </label>
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  required
                  value={formData.repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  className={`w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-black ${
                    passwordError 
                      ? 'focus:ring-red-500 border-red-300' 
                      : 'focus:ring-blue-500'
                  }`}
                  placeholder="Enter your password again"
                  maxLength={128}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showRepeatPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
          )}

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{loginError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full font-bold py-3 px-4 rounded-lg transition-colors ${
              isFormValid()
                ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <span className="text-gray-500 text-sm">
          {isSignUp ? 'Already have an account? ' : 'Do not have an account? '}
        </span>
        <button
          onClick={handleModeSwitch}
          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
        >
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </div>
  )
}

export default LoginForm
