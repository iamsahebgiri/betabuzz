const httpStatus = require('http-status');
const { Product } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody) => {
  return Product.create(productBody);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  Object.assign(options);
  const { results: products, ...rest } = await Product.paginate(filter, options);
  const results = await Promise.all(
    products.map(async (product) => {
      return product.toProductResponse();
    })
  );
  return { results, ...rest };
};

/**
 * Query recent products
 * @returns {Promise<QueryResult>}
 */
const queryRecentProducts = async () => {
  const products = await Product.find({}).sort({ createdAt: 'desc' }).limit(10);
  const results = await Promise.all(
    products.map(async (product) => {
      return product.toProductResponse();
    })
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
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  await product.remove();
  return product;
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
  return product;
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
  return product;
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
