const { prisma } = require('../../../config/prisma');

class PostService {
  async getPosts({ page = 1, limit = 10, category, search, author, sortBy = 'createdAt', sortOrder = 'desc' }) {
    const where = {};
    if (category) where.category = category;
    if (author) {
      if (author === 'me') {
        // Will be translated to actual userId in controller if needed
      } else {
        where.authorId = author;
      }
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }

    const total = await prisma.post.count({ where });
    const data = await prisma.post.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      include: { author: { select: { id: true, username: true, avatar: true } } }
    });

    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      meta: { sortBy, sortOrder }
    };
  }

  async createPost(postData) {
    return prisma.post.create({ data: postData });
  }

  async getPostById(id) {
    return prisma.post.findUnique({ where: { id }, include: { author: true } });
  }

  async updatePost(id, updates, userId) {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    if (existing.authorId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    return prisma.post.update({ where: { id }, data: updates });
  }

  async deletePost(id, userId) {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }
    if (existing.authorId !== userId) {
      const err = new Error('Forbidden');
      err.status = 403;
      throw err;
    }
    await prisma.post.delete({ where: { id } });
  }

  async searchPosts({ query, category, tags }) {
    const where = {};
    if (query) where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } }
    ];
    if (category) where.category = category;
    if (tags) where.tags = { hasSome: String(tags).split(',') };
    return prisma.post.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async getCategories() {
    const categories = await prisma.post.findMany({ select: { category: true }, distinct: ['category'] });
    return categories.map(c => c.category).filter(Boolean);
  }
}

module.exports = { PostService };


