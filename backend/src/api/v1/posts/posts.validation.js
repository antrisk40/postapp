const Joi = require('joi');

const createPostValidation = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().allow('', null),
    images: Joi.array().items(Joi.string().uri()).default([]),
    videos: Joi.array().items(Joi.string().uri()).default([]),
    tags: Joi.array().items(Joi.string()).default([]),
    category: Joi.string().allow('', null),
    published: Joi.boolean().default(true)
  })
});

const updatePostValidation = Joi.object({
  body: Joi.object({
    title: Joi.string().min(3).max(200),
    content: Joi.string().allow('', null),
    images: Joi.array().items(Joi.string().uri()),
    videos: Joi.array().items(Joi.string().uri()),
    tags: Joi.array().items(Joi.string()),
    category: Joi.string().allow('', null),
    published: Joi.boolean()
  })
});

const getPostsValidation = Joi.object({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    category: Joi.string().allow('', null),
    search: Joi.string().allow('', null),
    author: Joi.string().allow('', null),
    sortBy: Joi.string().valid('createdAt', 'title').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
  })
});

module.exports = { createPostValidation, updatePostValidation, getPostsValidation };


