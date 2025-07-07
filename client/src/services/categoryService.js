import api from './api'

export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    return await api.get('/categories')
  },

  // Get a single category
  getCategory: async (id) => {
    return await api.get(`/categories/${id}`)
  },

  // Create a new category (admin only)
  createCategory: async (categoryData) => {
    return await api.post('/categories', categoryData)
  },

  // Update a category (admin only)
  updateCategory: async (id, categoryData) => {
    return await api.put(`/categories/${id}`, categoryData)
  },

  // Delete a category (admin only)
  deleteCategory: async (id) => {
    return await api.delete(`/categories/${id}`)
  },
} 