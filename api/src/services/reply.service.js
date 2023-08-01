const httpStatus = require('http-status');
const discussionService = require('./discussion.service');
const { Reply } = require('../models');
const ApiError = require('../utils/ApiError');
const Discussion = require('../models/discussion.model');

/**
 * Reply on a discussion
 * @param {ObjectId} discussionId
 * @param {Object} replyBody
 * @returns {Promise<Reply>}
 */
const createReply = async (discussionId, replyBody) => {
  const discussion = await discussionService.getDiscussionById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  const reply = await Reply.create(replyBody);
  discussion.replies.push(reply.id);
  await discussion.save();

  return reply.toReplyResponse();
};

/**
 * Query for replies
 * @param {ObjectId} discussionId - Discussion Id
 * @param {ObjectId} userId - User Id
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getReplies = async (discussionId, userId) => {
  const discussion = await discussionService.getDiscussionById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }

  const replies = await Reply.find({ discussion: discussionId });
  const results = await Promise.all(replies.map(async (reply) => reply.toReplyResponse(userId)));
  return results;
};

/**
 * Get reply by id
 * @param {ObjectId} id
 * @returns {Promise<Reply>}
 */
const getReplyById = async (id) => {
  return Reply.findById(id);
};

/**
 * Get reply
 * @param {ObjectId} id
 * @returns {Promise<Reply>}
 */
const getReply = async (id) => {
  const reply = await getReplyById(id);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  return reply.toReplyResponse();
};

/**
 * Update reply by id
 * @param {ObjectId} replyId
 * @param {Object} updateBody
 * @returns {Promise<Reply>}
 */
const updateReplyById = async (replyId, updateBody) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  Object.assign(reply, updateBody);
  await reply.save();
  return reply.toReplyResponse();
};

/**
 * Delete reply by id
 * @param {ObjectId} replyId
 * @param {ObjectId} discussionId
 * @returns {Promise<Reply>}
 */
const deleteReplyById = async (replyId, discussionId) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  const discussion = await Discussion.findById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  await discussion.removeReply(replyId);

  await reply.deleteOne();
  return reply.toReplyResponse();
};

/**
 * Vote reply by id
 * @param {ObjectId} replyId
 * @param {ObjectId} userId
 * @returns {Promise<Reply>}
 */
const voteReplyById = async (replyId, userId) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  await reply.addUpvote(userId);
  return reply.toReplyResponse();
};

/**
 * Remove vote from reply by id
 * @param {ObjectId} replyId
 * @param {ObjectId} userId
 * @returns {Promise<Reply>}
 */
const unvoteReplyById = async (replyId, userId) => {
  const reply = await getReplyById(replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  await reply.removeUpvote(userId);
  return reply.toReplyResponse();
};

module.exports = {
  createReply,
  getReplies,
  getReplyById,
  getReply,
  updateReplyById,
  deleteReplyById,
  voteReplyById,
  unvoteReplyById,
};
