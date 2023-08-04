const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReply = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    raw: Joi.string().required(),
    parent: Joi.string().custom(objectId),
  }),
};

const getReplies = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
  }),
  query: Joi.object().keys({
    raw: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReply = {
  params: Joi.object().keys({
    discussionId: Joi.string().custom(objectId),
    replyId: Joi.string().custom(objectId),
  }),
};

const updateReply = {
  params: Joi.object().keys({
    discussionId: Joi.string().custom(objectId),
    replyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      raw: Joi.string().required(),
    })
    .min(1),
};

const voteReply = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
    replyId: Joi.required().custom(objectId),
  }),
};

const unvoteReply = {
  params: Joi.object().keys({
    discussionId: Joi.required().custom(objectId),
    replyId: Joi.required().custom(objectId),
  }),
};

const deleteReply = {
  params: Joi.object().keys({
    discussionId: Joi.string().custom(objectId),
    replyId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReply,
  getReplies,
  getReply,
  voteReply,
  unvoteReply,
  updateReply,
  deleteReply,
};
