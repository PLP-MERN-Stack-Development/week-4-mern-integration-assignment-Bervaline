import api from './api'

export const authService = {
  // Register a new user
  register: async (userData) => {
    return await api.post('/auth/register', userData)
  },

  // Login user
  login: async (email, password) => {
    return await api.post('/auth/login', { email, password })
  },

  // Get current user profile
  getMe: async () => {
    return await api.get('/auth/me')
  },

  // Logout user
  logout: async () => {
    return await api.post('/auth/logout')
  },
} 