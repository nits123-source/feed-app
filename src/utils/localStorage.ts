import type { Post, User } from '../types'

const STORAGE_KEYS = {
  POSTS: 'foo-rum-posts',
  USERS: 'foo-rum-users',
  CURRENT_USER: 'foo-rum-current-user'
}

// Posts
export const getPosts = (): Post[] => {
  try {
    const posts = localStorage.getItem(STORAGE_KEYS.POSTS)
    return posts ? JSON.parse(posts) : getDefaultPosts()
  } catch {
    return getDefaultPosts()
  }
}

export const savePost = (post: Post): void => {
  try {
    const posts = getPosts()
    posts.unshift(post) // Add to beginning
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
  } catch (error) {
    console.error('Failed to save post:', error)
  }
}

export const updatePost = (postId: string, updates: Partial<Post>): void => {
  try {
    const posts = getPosts()
    const index = posts.findIndex(p => p.id === postId)
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updates }
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts))
    }
  } catch (error) {
    console.error('Failed to update post:', error)
  }
}

// Users
export const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS)
    return users ? JSON.parse(users) : getDefaultUsers()
  } catch {
    return getDefaultUsers()
  }
}

export const saveUser = (user: User): void => {
  try {
    const users = getUsers()
    const existingIndex = users.findIndex(u => u.id === user.id)
    if (existingIndex !== -1) {
      users[existingIndex] = user
    } else {
      users.push(user)
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  } catch (error) {
    console.error('Failed to save user:', error)
  }
}

// Current user
export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export const setCurrentUser = (user: User | null): void => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    }
  } catch (error) {
    console.error('Failed to set current user:', error)
  }
}

// Default data
const getDefaultPosts = (): Post[] => [
  {
    id: '1',
    author: 'Theresa Webb',
    timestamp: '5 mins ago',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    emoji: '😢',
    likes: 12,
    comments: 3,
    shares: 1,
    createdAt: Date.now() - 300000
  },
  {
    id: '2',
    author: 'John Doe',
    timestamp: '1 hour ago',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '👍',
    likes: 8,
    comments: 2,
    shares: 0,
    createdAt: Date.now() - 3600000
  },
  {
    id: '3',
    author: 'Jane Doe',
    timestamp: '2 hours ago',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    emoji: '😎',
    likes: 15,
    comments: 5,
    shares: 2,
    createdAt: Date.now() - 7200000
  }
]

const getDefaultUsers = (): User[] => [
  {
    id: 'demo@example.com',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123'
  },
  {
    id: 'test@user.com',
    name: 'Test User',
    email: 'test@user.com',
    password: 'testpass'
  }
]
