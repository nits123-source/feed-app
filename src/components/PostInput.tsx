import { useState } from 'react'
import { sanitizeInput, sanitizePostContent } from '../utils/sanitize'
import { TrashIcon } from '../icons/trash-icon'
import { OrderedListIcon } from '../icons/ordered-list-icon'
import { AttachmentIcon } from '../icons/attachment-icon'
import { VoiceIcon } from '../icons/voice-icon'
import { CameraIcon } from '../icons/camera-icon'
import { SendIcon } from '../icons/send-icon'
import { EmojiIcon } from '../icons/emoji-icon'
import { CodingIcon } from '../icons/coding-icon'
import { HamburgerMenuIcon } from '../icons/hamburger-icon'

interface PostInputProps {
  onSubmit: (content: string) => void
}

const PostInput = ({ onSubmit }: PostInputProps) => {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (content.trim()) {
      // Sanitize content before submitting
      const sanitizedContent = sanitizePostContent(content)
      if (sanitizedContent.trim()) {
        onSubmit(sanitizedContent)
        setContent('')
      }
    }
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawContent = e.target.value
    const sanitizedContent = sanitizeInput(rawContent)
    setContent(sanitizedContent)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleNotImplemented = (feature: string) => {
    alert(`${feature} functionality is not implemented yet.`)
  }

  const isSendEnabled = content.trim().length > 0

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-2xl mx-auto mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 pb-3 border-b border-gray-100 gap-3">
        <div className="bg-gray-100 rounded-lg p-2 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-white rounded-lg px-3 py-1.5 border border-gray-200">
              <span className="text-sm text-gray-700">Paragraph</span>
            </div>
            
            <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleNotImplemented('Bold formatting')}
                className="px-2 py-1 rounded text-sm font-bold bg-white text-gray-800 border border-gray-200 transition-colors hover:bg-gray-50"
              >
                B
              </button>
              <button 
                onClick={() => handleNotImplemented('Italic formatting')}
                className="px-2 py-1 rounded text-sm italic text-gray-700 hover:bg-gray-200 transition-colors"
              >
                I
              </button>
              <button 
                onClick={() => handleNotImplemented('Underline formatting')}
                className="px-2 py-1 rounded text-sm underline text-gray-700 hover:bg-gray-200 transition-colors"
              >
                U
              </button>
            </div>
            
            <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={() => handleNotImplemented('Unordered list')}
                className="p-1 text-gray-700 hover:bg-gray-200 transition-colors rounded"
              >
                <HamburgerMenuIcon size={16} />
              </button>
              <button 
                onClick={() => handleNotImplemented('Ordered list')}
                className="p-1 text-gray-700 hover:bg-gray-200 transition-colors rounded"
              >
                <OrderedListIcon size={16} />
              </button>
            </div>
            
            <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
            
            <span className="text-sm text-gray-700 px-2 hidden sm:block">99</span>
            
            <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
            
            <button 
              onClick={() => handleNotImplemented('Code block')}
              className="p-1 text-gray-700 hover:bg-gray-200 transition-colors rounded"
            >
              <CodingIcon size={16} />
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => handleNotImplemented('Delete/Clear')}
          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors self-start sm:self-auto"
        >
          <TrashIcon size={16} />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-start gap-3">
          <EmojiIcon/>
          <textarea
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="How are you feeling today?"
            className="flex-1 resize-none border-none outline-none text-gray-700 placeholder-gray-400 min-h-[60px] text-base leading-relaxed"
            rows={3}
            maxLength={1000}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => handleNotImplemented('Add attachment')}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <AttachmentIcon size={16} />
          </button>
          
          <button 
            onClick={() => handleNotImplemented('Voice input')}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <VoiceIcon size={16} />
          </button>
          
          <button 
            onClick={() => handleNotImplemented('Camera')}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <CameraIcon size={16} />
          </button>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={!isSendEnabled}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
            isSendEnabled
              ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer shadow-sm hover:shadow-md transform hover:scale-105'
              : 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-60'
          }`}
        >
          <SendIcon 
            size={16}
            className={`transition-all duration-200 ${
              isSendEnabled ? 'opacity-100' : 'opacity-50'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default PostInput
