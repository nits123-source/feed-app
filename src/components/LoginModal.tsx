import type { User } from '../types'
import LoginForm from './LoginForm'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: User) => void
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="max-w-md w-full">
        <LoginForm onLogin={onLogin} onClose={onClose} />
      </div>
    </div>
  )
}

export default LoginModal
