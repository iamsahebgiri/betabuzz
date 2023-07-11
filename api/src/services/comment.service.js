const httpStatus = require('http-status');
const productService = require('./product.service');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');
const Product = require('../models/product.model');

/**
 * Comment on a product
 * @param {ObjectId} productId
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */
const createComment = async (productId, commentBody) => {
  const product = await productService.getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const comment = await Comment.create(commentBody);
  product.comments.push(comment.id);
  await product.save();

  return comment.toCommentResponse();
};

/**
 * Query for comments
 * @param {ObjectId} productId - Product Id
 * @param {ObjectId} userId - User Id
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getComments = async (productId, userId, filter, options) => {
  const product = await productService.getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  filter = { ...filter, product: productId };
  const { results: comments, ...rest } = await Comment.paginate(filter, options);
  const results = await Promise.all(
    comments.map(async (comment) => {
      return comment.toCommentResponse(userId);
    })
  );
  return { results, ...rest };
};

/**
 * Get comment by id
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  return Comment.findById(id);
};

/**
 * Get comment
 * @param {ObjectId} id
 * @returns {Promise<Comment>}
 */
const getComment = async (id) => {
  const comment = await getCommentById(id);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  return comment.toCommentResponse();
};

/**
 * Update comment by id
 * @param {ObjectId} commentId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await comment.save();
  return comment.toCommentResponse();
};

/**
 * Delete comment by id
 * @param {ObjectId} commentId
 * @param {ObjectId} productId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId, productId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.removeComment(commentId);

  await comment.remove();
  return comment.toCommentResponse();
};

/**
 * Vote comment by id
 * @param {ObjectId} commentId
 * @param {ObjectId} userId
 * @returns {Promise<Comment>}
 */
const voteCommentById = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.addUpvote(userId);
  return comment.toCommentResponse();
};

/**
 * Remove vote from comment by id
 * @param {ObjectId} commentId
 * @param {ObjectId} userId
 * @returns {Promise<Comment>}
 */
const unvoteCommentById = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.removeUpvote(userId);
  return comment.toCommentResponse();
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  getComment,
  updateCommentById,
  deleteCommentById,
  voteCommentById,
  unvoteCommentById,
};
