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
const commentOnProduct = async (productId, commentBody) => {
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

module.exports = {
  commentOnProduct,
};
