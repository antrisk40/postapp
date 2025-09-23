const { ApiResponse } = require('../../../utils/apiResponse');
const { PostService } = require('./posts.service');

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getPosts = async (req, res, next) => {
    try {
      const { page = '1', limit = '10', category, search, author, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      const result = await this.postService.getPosts({
        page: parseInt(page),
        limit: parseInt(limit),
        category,
        search,
        author: author === 'me' ? req.user?.id : author,
        sortBy,
        sortOrder
      });
      return ApiResponse.success(res, result.data, { pagination: result.pagination, meta: result.meta });
    } catch (error) { next(error); }
  };

  createPost = async (req, res, next) => {
    try {
      const body = req.body || {};
      const postData = {
        ...body,
        images: Array.isArray(body.images) ? body.images : (body.images ? [body.images] : []),
        authorId: req.user.id
      };
      const post = await this.postService.createPost(postData);
      return ApiResponse.created(res, post, 'Post created successfully');
    } catch (error) { next(error); }
  };

  getPostById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);
      if (!post) return ApiResponse.notFound(res, 'Post not found');
      return ApiResponse.success(res, post);
    } catch (error) { next(error); }
  };

  updatePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body || {};
      const updates = {
        ...body,
        ...(body.images !== undefined ? { images: Array.isArray(body.images) ? body.images : (body.images ? [body.images] : []) } : {})
      };
      const userId = req.user.id;
      const post = await this.postService.updatePost(id, updates, userId);
      return ApiResponse.success(res, post, 'Post updated successfully');
    } catch (error) { next(error); }
  };

  deletePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      await this.postService.deletePost(id, userId);
      return ApiResponse.success(res, null, 'Post deleted successfully');
    } catch (error) { next(error); }
  };

  searchPosts = async (req, res, next) => {
    try {
      const { q, category, tags } = req.query;
      const posts = await this.postService.searchPosts({ query: q, category, tags });
      return ApiResponse.success(res, posts);
    } catch (error) { next(error); }
  };

  getCategories = async (req, res, next) => {
    try {
      const categories = await this.postService.getCategories();
      return ApiResponse.success(res, categories);
    } catch (error) { next(error); }
  };
}

module.exports = { PostController };


