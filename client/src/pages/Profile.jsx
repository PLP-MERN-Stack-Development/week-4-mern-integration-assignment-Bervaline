import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { postService } from '../services'
import { User, Calendar, Mail, Edit } from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useAuth()
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserPosts()
  }, [])

  const fetchUserPosts = async () => {
    try {
      setLoading(true)
      const response = await postService.getAllPosts(1, 10, '', '', user.id)
      setUserPosts(response.data)
    } catch (error) {
      toast.error('Failed to fetch user posts')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={32} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 mb-2">@{user.username}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Member since {formatDate(user.createdAt)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'admin' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Your Posts</h2>
          
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : userPosts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
              <a href="/create-post" className="btn btn-primary">
                Create Your First Post
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        <a href={`/posts/${post._id}`} className="hover:text-blue-600">
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {post.excerpt || 'No excerpt available'}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(post.createdAt)}</span>
                        {post.category && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {post.category.name}
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/edit-post/${post._id}`}
                        className="btn btn-outline flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile 