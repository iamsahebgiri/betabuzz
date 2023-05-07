const httpStatus = require('http-status');
const productService = require('./product.service');
const { Comment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Comment on a product
 * @param {Object} productId
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */
const createComment = async (productId, commentBody) => {
  const product = await productService.getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  let comment = await Comment.create(commentBody);
  product.comments.push(comment.id);
  await product.save();

  comment = await comment.populate('author', 'name email').populate('product', 'name description link').execPopulate();
  return comment;
};

/**
 * Query for comments
 * @param {String} productId - Mongo filter
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
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await comment.remove();
  return comment.toCommentResponse();
};

module.exports = {
  createComment,
  getComments,
  getCommentById,
  getComment,
  updateCommentById,
  deleteCommentById,
};
