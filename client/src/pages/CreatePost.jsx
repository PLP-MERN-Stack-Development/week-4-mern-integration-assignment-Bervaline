import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { postService, categoryService } from '../services'
import { Save, X } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {
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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

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
      setLoading(true)
      
      // Convert tags string to array
      const postData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      }

      await postService.createPost(postData)
      toast.success('Post created successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.error || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <button
            onClick={() => navigate('/')}
            className="btn btn-outline flex items-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
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
                  <span className="form-label mb-0">Publish immediately</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost 