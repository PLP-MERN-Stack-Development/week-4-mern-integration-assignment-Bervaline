import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, Plus, Home } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Home size={24} />
            MERN Blog
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to="/create-post" 
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Plus size={16} />
                  New Post
                </Link>
                <div className="flex items-center gap-2">
                  <Link 
                    to="/profile" 
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <User size={16} />
                    {user.firstName}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 