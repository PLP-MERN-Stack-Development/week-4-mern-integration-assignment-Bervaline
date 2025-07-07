// posts.js - Posts routes

const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require('../controllers/posts');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, addComment);

module.exports = router; 