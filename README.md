# MERN Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, CRUD operations for blog posts, comments, and advanced features.

## 🚀 Features

### Backend Features
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **User Authentication** with JWT tokens
- **Password Encryption** using bcryptjs
- **Input Validation** with express-validator
- **Error Handling** middleware
- **File Upload** support for images
- **Pagination** and search functionality
- **Role-based Authorization** (User/Admin)

### Frontend Features
- **React** with modern hooks and context
- **Responsive Design** with CSS Grid and Flexbox
- **React Router** for navigation
- **Form Validation** and error handling
- **Real-time Search** and filtering
- **Pagination** for post lists
- **Protected Routes** for authenticated users
- **Toast Notifications** for user feedback

### Blog Features
- **Full CRUD** operations for blog posts
- **User Registration** and login
- **Comment System** on posts
- **Category Management**
- **Tag System** for posts
- **Featured Images** for posts
- **Draft/Published** post status
- **View Count** tracking
- **Search** and filter functionality

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **multer** - File uploads
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Project Structure

```
mern-blog/
├── server/                 # Backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   └── package.json       # Server dependencies
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html         # HTML template
│   └── package.json       # Client dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Start the development servers**

   In the server directory:
   ```bash
   npm run dev
   ```

   In the client directory (new terminal):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Posts Endpoints

#### Get All Posts
```
GET /api/posts?page=1&limit=10&search=keyword&category=categoryId
```

#### Get Single Post
```
GET /api/posts/:id
```

#### Create Post
```
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Brief description",
  "category": "categoryId",
  "tags": ["tag1", "tag2"],
  "featuredImage": "image-url",
  "isPublished": true
}
```

#### Update Post
```
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Post
```
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment
```
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Comment text"
}
```

### Categories Endpoints

#### Get All Categories
```
GET /api/categories
```

#### Create Category (Admin only)
```
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Category Name",
  "description": "Category description"
}
```

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration/Login**: Users receive a JWT token
2. **Protected Routes**: Include token in Authorization header
3. **Role-based Access**: Admin users have additional privileges
4. **Token Expiration**: Tokens expire after 30 days

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Loading States**: Spinners and skeleton loaders
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation with helpful feedback
- **Toast Notifications**: Success and error notifications

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Use a process manager like PM2
3. Set up MongoDB Atlas or production MongoDB
4. Configure CORS for your frontend domain

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or any static hosting service
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] Image upload with cloud storage
- [ ] Rich text editor for posts
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Advanced search filters
- [ ] User profiles with avatars
- [ ] Post analytics
- [ ] Newsletter subscription
- [ ] API rate limiting
- [ ] Caching implementation 