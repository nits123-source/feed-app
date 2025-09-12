export interface Post {
  id: string
  author: string
  timestamp: string
  content: string
  emoji: string
  likes: number
  comments: number
  shares: number
  createdAt: number
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
