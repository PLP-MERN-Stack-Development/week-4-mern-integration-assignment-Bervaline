import api from './api'

export const postService = {
  // Get all posts with optional pagination and filters
  getAllPosts: async (page = 1, limit = 10, search = '', category = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })
    
    if (search) params.append('search', search)
    if (category) params.append('category', category)
    
    return await api.get(`/posts?${params.toString()}`)
  },

  // Get a single post by ID
  getPost: async (id) => {
    return await api.get(`/posts/${id}`)
  },

  // Create a new post
  createPost: async (postData) => {
    return await api.post('/posts', postData)
  },

  // Update an existing post
  updatePost: async (id, postData) => {
    return await api.put(`/posts/${id}`, postData)
  },

  // Delete a post
  deletePost: async (id) => {
    return await api.delete(`/posts/${id}`)
  },

  // Add a comment to a post
  addComment: async (postId, content) => {
    return await api.post(`/posts/${postId}/comments`, { content })
  },
} 