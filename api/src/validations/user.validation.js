const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    username: Joi.string(),
    gender: Joi.string().valid('male', 'female', 'non-binary', 'other'),
    nationality: Joi.string(),
    language: Joi.string(),
    interests: Joi.array().items(Joi.string()),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getUserByUsername = {
  params: Joi.object().keys({
    username: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid('user', 'admin'),
      username: Joi.string(),
      preferences: Joi.object(),
      socials: Joi.array().items(
        Joi.object().keys({
          platform: Joi.string(),
          href: Joi.string(),
        })
      ),
      dateOfBirth: Joi.date(),
      bio: Joi.string(),
      gender: Joi.string().valid('male', 'female', 'non-binary', 'other'),
      nationality: Joi.string(),
      language: Joi.string(),
      interests: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const uploadAvatar = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  file: Joi.object().required(),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  uploadAvatar,
};
