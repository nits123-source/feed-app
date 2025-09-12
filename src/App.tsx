import { useState, useEffect } from 'react'
import Header from "./layout/header"
import Feed from "./components/Feed"
import LoginModal from "./components/LoginModal"
import LoginPage from "./components/LoginPage"
import type { User } from './types'
import { getCurrentUser } from './utils/localStorage'

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLoginPage, setShowLoginPage] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
  }, [])

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    setShowLoginModal(false)
    setShowLoginPage(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('foo-rum-current-user')
  }

  const handleHeaderLoginClick = () => {
    setShowLoginPage(true)
  }

  const handleUnauthorizedAction = () => {
    setShowLoginModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        currentUser={currentUser}
        onLoginClick={handleHeaderLoginClick}
        onLogout={handleLogout}
      />
      
      <div className="flex-1">
        {showLoginPage ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <Feed 
            currentUser={currentUser}
            onUnauthorizedAction={handleUnauthorizedAction}
          />
        )}
      </div>
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default App
