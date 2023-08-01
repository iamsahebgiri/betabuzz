const httpStatus = require('http-status');
const { Product, Comment } = require('../models');
const ApiError = require('../utils/ApiError');
const { deleteImage } = require('./image.service');
const Image = require('../models/image.model');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  const product = await Product.create(productBody);
  const image = await Image.findOne({
    url: productBody.image,
  });
  image.expires = false;
  await image.save();
  return product;
};

/**
 * Query for products
 * @param {ObjectId} userId - User id
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (userId, filter, options) => {
  Object.assign(options);
  const { results: products, ...rest } = await Product.paginate(filter, options);
  const results = await Promise.all(
    products.map(async (product) => {
      return product.toProductResponse(userId);
    }),
  );
  return { results, ...rest };
};

/**
 * Query recent products
 * @param {ObjectId} userId - User id
 * @returns {Promise<QueryResult>}
 */
const queryRecentProducts = async () => {
  const products = await Product.find({}).sort({ createdAt: 'desc' }).limit(10);
  const results = await Promise.all(
    products.map(async (product) => {
      return product.toProductResponse();
    }),
  );
  return { results, totalResults: products.length };
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, userId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product.toProductResponse(userId);
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @param {ObjectId} userId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId, userId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (product.maker.toString() !== userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only its maker can delete it');
  }
  await product.deleteOne();
  await Comment.deleteMany({
    product: product.id,
  });
  await deleteImage(product.image);
  return product.toProductResponse(userId);
};

/**
 * Add Upvote product by id
 * @param {ObjectId} productId
 * @param {ObjectId} userId
 * @returns {Promise<Product>}
 */
const voteProductById = async (productId, userId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.addUpvote(userId);
  return product.toProductResponse(userId);
};

/**
 * Remove upvote product by id
 * @param {ObjectId} productId
 * @param {ObjectId} userId
 * @returns {Promise<Product>}
 */
const unvoteProductById = async (productId, userId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.removeUpvote(userId);
  return product.toProductResponse(userId);
};

module.exports = {
  createProduct,
  queryProducts,
  queryRecentProducts,
  getProductById,
  updateProductById,
  voteProductById,
  unvoteProductById,
  deleteProductById,
};
