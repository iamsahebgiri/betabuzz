const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const discussionController = require('../../controllers/discussion.controller');
const discussionValidation = require('../../validations/discussion.validation');
const replyValidation = require('../../validations/reply.validation');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(discussionValidation.createDiscussion), discussionController.createDiscussion)
  .get(auth(), discussionController.getDiscussions);

router
  .route('/:discussionId')
  .get(auth(), validate(discussionValidation.getDiscussion), discussionController.getDiscussion)
  .patch(auth(), validate(discussionValidation.updateDiscussion), discussionController.updateDiscussion)
  .delete(auth(), validate(discussionValidation.deleteDiscussion), discussionController.deleteDiscussion);

router
  .route('/:discussionId/vote')
  .post(auth(), validate(discussionValidation.voteDiscussion), discussionController.voteDiscussion);

router
  .route('/:discussionId/unvote')
  .delete(auth(), validate(discussionValidation.unvoteDiscussion), discussionController.unvoteDiscussion);

router.route('/:discussionId/replies').get(auth(), validate(replyValidation.getReplies), discussionController.getReplies);
router.route('/:discussionId/reply').post(auth(), validate(replyValidation.createReply), discussionController.createReply);
router
  .route('/:discussionId/reply/:replyId')
  .get(auth(), validate(replyValidation.getReply), discussionController.getReply)
  .patch(auth(), validate(replyValidation.updateReply), discussionController.updateReply)
  .delete(auth(), validate(replyValidation.deleteReply), discussionController.deleteReply);

router
  .route('/:discussionId/reply/:replyId/vote')
  .post(auth(), validate(replyValidation.voteReply), discussionController.voteReply);
router
  .route('/:discussionId/reply/:replyId/unvote')
  .delete(auth(), validate(replyValidation.unvoteReply), discussionController.unvoteReply);

module.exports = router;
