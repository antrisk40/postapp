const Joi = require('joi');

const updateProfileValidation = Joi.object({
  body: Joi.object({
    name: Joi.string().max(100).allow('', null),
    bio: Joi.string().max(500).allow('', null),
    avatar: Joi.string().uri().allow('', null)
  })
});

module.exports = { updateProfileValidation };


