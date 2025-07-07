import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { postService } from '../services'
import { Calendar, User, Eye, MessageCircle, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const PostDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      setLoading(true)
      const response = await postService.getPost(id)
      setPost(response.data)
    } catch (error) {
      toast.error('Failed to fetch post')
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    
    if (!comment.trim()) {
      toast.error('Please enter a comment')
      return
    }

    try {
      setSubmitting(true)
      await postService.addComment(id, comment)
      setComment('')
      await fetchPost() // Refresh post to get new comment
      toast.success('Comment added successfully!')
    } catch (error) {
      toast.error('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Post not found.</p>
      </div>
    )
  }

  const canEdit = user && (user.id === post.author._id || user.role === 'admin')

  return (
    <div className="py-8">
      <article className="max-w-4xl mx-auto">
        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User size={16} />
                {post.author?.firstName} {post.author?.lastName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                {post.viewCount} views
              </div>
            </div>
            
            {canEdit && (
              <div className="flex items-center gap-2">
                <Link 
                  to={`/edit-post/${post._id}`}
                  className="btn btn-outline flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit
                </Link>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
          )}

          {post.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {post.category.name}
            </span>
          )}
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <section className="border-t pt-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle size={24} />
            Comments ({post.comments?.length || 0})
          </h3>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="form-group">
                <label htmlFor="comment" className="form-label">
                  Add a comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-input form-textarea"
                  placeholder="Share your thoughts..."
                  rows="4"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Please{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  sign in
                </Link>{' '}
                to leave a comment.
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">
                      {comment.user?.firstName} {comment.user?.lastName}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </section>
      </article>
    </div>
  )
}

export default PostDetail 