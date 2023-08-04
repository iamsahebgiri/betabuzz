const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { upload } = require('../../middlewares/multer');
const productController = require('../../controllers/product.controller');
const productValidation = require('../../validations/product.validation');
const commentValidation = require('../../validations/comment.validation');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), productController.getProducts);

router.get('/trending', auth(), productController.getTrendingProducts);
router.get('/recent', auth(), productController.getRecentProducts);

router
  .route('/image')
  .post(auth(), upload.single('image'), validate(productValidation.uploadImage), productController.uploadImage)
  .delete(auth(), validate(productValidation.removeImage), productController.removeImage);

router
  .route('/:productId')
  .get(auth(), validate(productValidation.getProduct), productController.getProduct)
  .patch(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), validate(productValidation.deleteProduct), productController.deleteProduct);

router.route('/:productId/vote').post(auth(), validate(productValidation.voteProduct), productController.voteProduct);
router
  .route('/:productId/unvote')
  .delete(auth(), validate(productValidation.unvoteProduct), productController.unvoteProduct);

router.route('/:productId/comments').get(auth(), validate(commentValidation.getComments), productController.getComments);
router.route('/:productId/comment').post(auth(), validate(commentValidation.createComment), productController.createComment);
router
  .route('/:productId/comment/:commentId')
  .get(auth(), validate(commentValidation.getComment), productController.getComment)
  .patch(auth(), validate(commentValidation.updateComment), productController.updateComment)
  .delete(auth(), validate(commentValidation.deleteComment), productController.deleteComment);

router
  .route('/:productId/comment/:commentId/vote')
  .post(auth(), validate(commentValidation.voteComment), productController.voteComment);
router
  .route('/:productId/comment/:commentId/unvote')
  .delete(auth(), validate(commentValidation.unvoteComment), productController.unvoteComment);

module.exports = router;
