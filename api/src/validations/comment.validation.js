const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createComment = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
    parent: Joi.string().custom(objectId),
  }),
};

const getComments = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    content: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      content: Joi.string().required(),
    })
    .min(1),
};

const voteComment = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
    commentId: Joi.required().custom(objectId),
  }),
};

const unvoteComment = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
    commentId: Joi.required().custom(objectId),
  }),
};

const deleteComment = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
    commentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createComment,
  getComments,
  getComment,
  voteComment,
  unvoteComment,
  updateComment,
  deleteComment,
};
