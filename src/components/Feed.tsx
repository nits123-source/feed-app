import { useState, useEffect } from 'react'
import PostInput from './PostInput'
import PostCard from './PostCard'
import type { Post, User } from '../types'
import { getPosts, savePost} from '../utils/localStorage'
import { sanitizeName } from '../utils/sanitize'

interface FeedProps {
  currentUser: User | null
  onUnauthorizedAction: () => void
}

const Feed = ({ currentUser, onUnauthorizedAction }: FeedProps) => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    // Load posts from localStorage
    setPosts(getPosts())
  }, [])

  const handleNewPost = (content: string) => {
    if (!currentUser) {
      onUnauthorizedAction()
      return
    }

    const newPost: Post = {
      id: Date.now().toString(),
      author: sanitizeName(currentUser.name),
      timestamp: 'now',
      content,
      emoji: '😊',
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: Date.now()
    }

    savePost(newPost)
    setPosts([newPost, ...posts])
  }

  const handleLike = (postId: string) => {
    if (!currentUser) {
      onUnauthorizedAction()
      return
    }

    alert(`Like functionality is not implemented yet ${postId}`)
  }

  const handlePostInputClick = () => {
    if (!currentUser) {
      onUnauthorizedAction()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {currentUser ? (
          <PostInput onSubmit={handleNewPost} />
        ) : (
          <div onClick={handlePostInputClick} className="cursor-pointer">
            <PostInput onSubmit={() => {}} />
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onLike={() => handleLike(post.id)}
              currentUser={currentUser}
              onUnauthorizedAction={onUnauthorizedAction}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
            <p className="text-gray-500">Be the first to share something!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feed
