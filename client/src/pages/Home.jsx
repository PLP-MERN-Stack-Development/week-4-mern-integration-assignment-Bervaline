import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { postService, categoryService } from '../services'
import { Search, Calendar, User, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [currentPage, search, selectedCategory])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await postService.getAllPosts(
        currentPage,
        10,
        search,
        selectedCategory
      )
      setPosts(response.data)
      setPagination(response.pagination || {})
    } catch (error) {
      toast.error('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories()
      setCategories(response.data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading && posts.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10"
              />
            </div>
          </form>
          
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="form-input md:w-48"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post._id} className="card hover:shadow-lg transition-shadow">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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

              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              )}

              {post.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {post.category.name}
                </span>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.next || pagination.prev ? (
        <div className="flex justify-center items-center gap-4 mt-8">
          {pagination.prev && (
            <button
              onClick={() => setCurrentPage(pagination.prev.page)}
              className="btn btn-outline"
            >
              Previous
            </button>
          )}
          
          <span className="text-gray-600">
            Page {currentPage}
          </span>
          
          {pagination.next && (
            <button
              onClick={() => setCurrentPage(pagination.next.page)}
              className="btn btn-outline"
            >
              Next
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Home 