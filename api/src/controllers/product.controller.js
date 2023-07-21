const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, commentService, imageService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    maker: req.user,
  };
  const product = await productService.createProduct(payload);
  res.status(httpStatus.CREATED).send(product);
});

const getTrendingProducts = catchAsync(async (req, res) => {
  const products = await productService.queryProducts(req.user.id);
  res.send(products);
});

const getRecentProducts = catchAsync(async (req, res) => {
  const products = await productService.queryRecentProducts(req.user.id);
  res.send(products);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(req.user.id, filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  product = await product.toProductResponse(req.user.id);
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.user.id, req.body);
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
  await productService.deleteProductById(req.params.productId, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const createComment = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const commentBody = {
    content: req.body.content,
    author: req.user.id,
    parent: req.body.parent,
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

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getComment(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  res.send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId, req.params.productId);
  res.status(httpStatus.NO_CONTENT).send();
});

const unvoteComment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const comment = await commentService.unvoteCommentById(req.params.commentId, userId);
  res.send(comment);
});

const voteComment = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const comment = await commentService.voteCommentById(req.params.commentId, userId);
  res.send(comment);
});

const uploadImage = catchAsync(async (req, res) => {
  const file = pick(req.file, ['buffer', 'mimetype']);
  const userId = req.user.id;
  const image = await imageService.uploadImage(file, userId);
  res.status(httpStatus.CREATED).send(image);
});

const removeImage = catchAsync(async (req, res) => {
  await imageService.deleteImage(req.body);
  res.status(httpStatus.NO_CONTENT).send();
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
  getComment,
  updateComment,
  deleteComment,
  unvoteComment,
  voteComment,
  uploadImage,
  removeImage,
};
