import type { Post, User } from '../types'
import HeartIcon from '../icons/heart-icon'
import CommentIcon from '../icons/comment-icon'
import ShareIcon from '../icons/share-icon'

interface PostCardProps {
  post: Post
  onLike: () => void
  currentUser: User | null
  onUnauthorizedAction: () => void
}

const PostCard = ({ post,currentUser, onUnauthorizedAction }: PostCardProps) => {
  const handleLike = () => {
    if (!currentUser) {
      onUnauthorizedAction()
      return
    }
    alert('Like functionality is not implemented yet')
  }

  const handleComment = () => {
    if (!currentUser) {
      onUnauthorizedAction()
      return
    }
    alert('Comment functionality is not implemented yet')
  }

  const handleShare = () => {
    if (!currentUser) {
      onUnauthorizedAction()
      return
    }
    alert('Share functionality is not implemented yet')
  }

  return (
    <div className="bg-gray-100 rounded-2xl p-4 max-w-2xl mx-auto mb-4">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <h3 className="font-bold text-gray-900 text-base">{post.author}</h3>
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{post.emoji}</span>
          <p className="text-gray-800 leading-relaxed text-base">{post.content}</p>
        </div>
      </div>

      <div className="flex items-center gap-8 px-2">
        <button 
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <HeartIcon />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        
        <button 
          onClick={handleComment}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
        >
          <CommentIcon />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors"
        >
          <ShareIcon />
          <span className="text-sm font-medium">{post.shares}</span>
        </button>
      </div>
    </div>
  )
}

export default PostCard
