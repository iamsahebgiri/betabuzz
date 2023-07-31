const httpStatus = require('http-status');
const { Discussion, Reply } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a discussion
 * @param {Object} discussionBody
 * @returns {Promise<Discussion>}
 */
const createDiscussion = async (discussionBody) => {
  const discussion = await Discussion.create(discussionBody);
  return discussion;
};

/**
 * Query for discussions
 * @param {ObjectId} userId - User id
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDiscussions = async (userId, filter, options) => {
  Object.assign(options);
  const { results: discussions, ...rest } = await Discussion.paginate(filter, options);
  const results = await Promise.all(
    discussions.map(async (discussion) => {
      return discussion.toDiscussionResponse(userId);
    })
  );
  return { results, ...rest };
};

/**
 * Query recent discussions
 * @param {ObjectId} userId - User id
 * @returns {Promise<QueryResult>}
 */
const queryRecentDiscussions = async () => {
  const discussions = await Discussion.find({}).sort({ createdAt: 'desc' }).limit(10);
  const results = await Promise.all(
    discussions.map(async (discussion) => {
      return discussion.toDiscussionResponse();
    })
  );
  return { results, totalResults: discussions.length };
};

/**
 * Get discussion by id
 * @param {ObjectId} id
 * @returns {Promise<Discussion>}
 */
const getDiscussionById = async (id) => {
  return Discussion.findById(id);
};

/**
 * Update discussion by id
 * @param {ObjectId} discussionId
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Discussion>}
 */
const updateDiscussionById = async (discussionId, userId, updateBody) => {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  Object.assign(discussion, updateBody);
  await discussion.save();
  return discussion.toDiscussionResponse(userId);
};

/**
 * Delete discussion by id
 * @param {ObjectId} discussionId
 * @param {ObjectId} userId
 * @returns {Promise<Discussion>}
 */
const deleteDiscussionById = async (discussionId, userId) => {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  if (discussion.author.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only its author can delete it');
  }
  await discussion.remove();
  await Reply.remove({
    discussion: discussion.id,
  });
  return discussion.toDiscussionResponse(userId);
};

/**
 * Add Upvote discussion by id
 * @param {ObjectId} discussionId
 * @param {ObjectId} userId
 * @returns {Promise<Discussion>}
 */
const voteDiscussionById = async (discussionId, userId) => {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  await discussion.addUpvote(userId);
  return discussion.toDiscussionResponse(userId);
};

/**
 * Remove upvote discussion by id
 * @param {ObjectId} discussionId
 * @param {ObjectId} userId
 * @returns {Promise<Discussion>}
 */
const unvoteDiscussionById = async (discussionId, userId) => {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  await discussion.removeUpvote(userId);
  return discussion.toDiscussionResponse(userId);
};

module.exports = {
  createDiscussion,
  queryDiscussions,
  queryRecentDiscussions,
  getDiscussionById,
  updateDiscussionById,
  voteDiscussionById,
  unvoteDiscussionById,
  deleteDiscussionById,
};
