const Joi = require('joi');

const registerValidation = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    name: Joi.string().max(100).allow('', null),
    password: Joi.string().min(6).max(100).required(),
    avatar: Joi.string().uri().allow('', null)
  })
});

const loginValidation = Joi.object({
  body: Joi.object({
    emailOrUsername: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(100).required()
  })
});

module.exports = { registerValidation, loginValidation };




