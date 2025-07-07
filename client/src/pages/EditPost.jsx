import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postService, categoryService } from '../services'
import { Save, X, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: '',
    isPublished: false,
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchCategories()
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await postService.getPost(id)
      const post = response.data
      
      setFormData({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        category: post.category?._id || '',
        tags: post.tags ? post.tags.join(', ') : '',
        featuredImage: post.featuredImage || '',
        isPublished: post.isPublished || false,
      })
    } catch (error) {
      toast.error('Failed to fetch post')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories()
      setCategories(response.data)
    } catch (error) {
      toast.error('Failed to fetch categories')
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.content || !formData.category) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      
      // Convert tags string to array
      const postData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      }

      await postService.updatePost(id, postData)
      toast.success('Post updated successfully!')
      navigate(`/posts/${id}`)
    } catch (error) {
      toast.error(error.error || 'Failed to update post')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    try {
      setDeleting(true)
      await postService.deletePost(id)
      toast.success('Post deleted successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.error || 'Failed to delete post')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/posts/${id}`)}
              className="btn btn-outline flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="btn btn-danger flex items-center gap-2"
            >
              <Trash2 size={16} />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter post title"
                  required
                />
              </div>

              {/* Content */}
              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="Write your post content..."
                  rows="15"
                  required
                />
              </div>

              {/* Excerpt */}
              <div className="form-group">
                <label htmlFor="excerpt" className="form-label">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Brief description of your post..."
                  rows="3"
                  maxLength="200"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.excerpt.length}/200 characters
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>

              {/* Featured Image */}
              <div className="form-group">
                <label htmlFor="featuredImage" className="form-label">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Published Status */}
              <div className="form-group">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="rounded border-gray-300"
                  />
                  <span className="form-label mb-0">Published</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost 