const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDiscussion = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const getDiscussions = {
  query: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.custom(objectId),
    upvotes: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDiscussion = {
  params: Joi.object().keys({
    discussionId: Joi.string().custom(objectId),
  }),
};

const updateDiscussion = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      content: Joi.string().required(),
    })
    .min(1),
};

const voteDiscussion = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
  }),
};

const unvoteDiscussion = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
  }),
};

const deleteDiscussion = {
  params: Joi.object().keys({
    discussionId: Joi.string().custom(objectId),
  }),
};

const uploadImage = {
  file: Joi.object().required(),
};

const removeImage = {
  image: Joi.string().required(),
};

module.exports = {
  createDiscussion,
  getDiscussions,
  getDiscussion,
  voteDiscussion,
  unvoteDiscussion,
  updateDiscussion,
  deleteDiscussion,
  uploadImage,
  removeImage,
};
