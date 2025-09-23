const { Router } = require('express');
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const userRoutes = require('./users');
const uploadRoutes = require('./upload');

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

router.get('/docs', (req, res) => {
  res.json({
    version: '1.0.0',
    title: 'Post App API v1',
    description: 'RESTful API for Post Management System',
    endpoints: {
      auth: '/api/v1/auth',
      posts: '/api/v1/posts',
      users: '/api/v1/users',
      upload: '/api/v1/upload'
    }
  });
});

module.exports = router;


