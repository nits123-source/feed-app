import type { User } from '../types'
import LoginForm from './LoginForm'

interface LoginPageProps {
  onLogin: (user: User) => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className="flex-1 flex items-center h-screen justify-center p-4">
      <LoginForm onLogin={onLogin} />
    </div>
  )
}

export default LoginPage
