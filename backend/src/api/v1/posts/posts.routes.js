const { Router } = require('express');
const { PostController } = require('./posts.controller');
const { authMiddleware, optionalAuth } = require('../../../middleware/auth');
const { validateRequest } = require('../../../middleware/validation');
const { createPostValidation, updatePostValidation, getPostsValidation } = require('./posts.validation');

const router = Router();
const postController = new PostController();

router.get('/', optionalAuth, validateRequest(getPostsValidation), postController.getPosts);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPostById);

router.use(authMiddleware);

router.post('/', validateRequest(createPostValidation), postController.createPost);
router.put('/:id', validateRequest(updatePostValidation), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;


