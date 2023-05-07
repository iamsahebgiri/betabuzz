const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, commentService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    maker: req.user,
  };
  const product = await productService.createProduct(payload);
  res.status(httpStatus.CREATED).send(product);
});

const getTrendingProducts = catchAsync(async (_, res) => {
  const products = await productService.queryProducts();
  res.send(products);
});

const getRecentProducts = catchAsync(async (_, res) => {
  const products = await productService.queryRecentProducts();
  res.send(products);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  product = await product.toProductResponse();
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const unvoteProduct = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const product = await productService.unvoteProductById(req.params.productId, userId);
  res.send(product);
});

const voteProduct = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const product = await productService.voteProductById(req.params.productId, userId);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const createComment = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const commentBody = {
    content: req.body.content,
    author: req.user.id,
    product: productId,
  };
  const comment = await commentService.createComment(productId, commentBody);
  res.status(httpStatus.CREATED).send(comment);
});

const getComments = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;
  const filter = pick(req.query, ['content']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const comments = await commentService.getComments(productId, userId, filter, options);
  res.send(comments);
});

module.exports = {
  createProduct,
  getProducts,
  getTrendingProducts,
  getRecentProducts,
  getProduct,
  updateProduct,
  unvoteProduct,
  voteProduct,
  deleteProduct,
  createComment,
  getComments,
};
