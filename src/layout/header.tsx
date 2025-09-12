import { LoginIcon } from "../icons/login-icon"
import LogoIcon from "../icons/logo-icon"
import type { User } from '../types'

interface HeaderProps {
  currentUser: User | null
  onLoginClick: () => void
  onLogout: () => void
}

const Header = ({ currentUser, onLoginClick, onLogout }: HeaderProps) => {
  return (
    <header className="bg-white px-4 py-3 fixed top-0 left-0 right-0 z-40">
      <div className="w-full mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <span className="text-xl font-bold text-gray-800">foo-rum</span>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">{currentUser.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <span className="font-medium">Login</span>
              <LoginIcon />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
