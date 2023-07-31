const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { discussionService, replyService } = require('../services');

const createDiscussion = catchAsync(async (req, res) => {
  const payload = {
    ...req.body,
    author: req.user,
  };
  const discussion = await discussionService.createDiscussion(payload);
  res.status(httpStatus.CREATED).send(discussion);
});

const getDiscussions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'link', 'author', 'upvotes']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await discussionService.queryDiscussions(req.user.id, filter, options);
  res.send(result);
});

const getDiscussion = catchAsync(async (req, res) => {
  let discussion = await discussionService.getDiscussionById(req.params.discussionId);
  if (!discussion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Discussion not found');
  }
  discussion = await discussion.toDiscussionResponse(req.user.id);
  res.send(discussion);
});

const updateDiscussion = catchAsync(async (req, res) => {
  const discussion = await discussionService.updateDiscussionById(req.params.discussionId, req.user.id, req.body);
  res.send(discussion);
});

const unvoteDiscussion = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const discussion = await discussionService.unvoteDiscussionById(req.params.discussionId, userId);
  res.send(discussion);
});

const voteDiscussion = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const discussion = await discussionService.voteDiscussionById(req.params.discussionId, userId);
  res.send(discussion);
});

const deleteDiscussion = catchAsync(async (req, res) => {
  await discussionService.deleteDiscussionById(req.params.discussionId, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const createReply = catchAsync(async (req, res) => {
  const { discussionId } = req.params;
  const replyBody = {
    content: req.body.content,
    author: req.user.id,
    parent: req.body.parent,
    discussion: discussionId,
  };
  const reply = await replyService.createReply(discussionId, replyBody);
  res.status(httpStatus.CREATED).send(reply);
});

const getReplies = catchAsync(async (req, res) => {
  const { discussionId } = req.params;
  const userId = req.user.id;
  const filter = pick(req.query, ['content']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const replies = await replyService.getReplies(discussionId, userId, filter, options);
  res.send(replies);
});

const getReply = catchAsync(async (req, res) => {
  const reply = await replyService.getReply(req.params.replyId);
  if (!reply) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reply not found');
  }
  res.send(reply);
});

const updateReply = catchAsync(async (req, res) => {
  const reply = await replyService.updateReplyById(req.params.replyId, req.body);
  res.send(reply);
});

const deleteReply = catchAsync(async (req, res) => {
  await replyService.deleteReplyById(req.params.replyId, req.params.discussionId);
  res.status(httpStatus.NO_CONTENT).send();
});

const unvoteReply = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const reply = await replyService.unvoteReplyById(req.params.replyId, userId);
  res.send(reply);
});

const voteReply = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const reply = await replyService.voteReplyById(req.params.replyId, userId);
  res.send(reply);
});

module.exports = {
  createDiscussion,
  getDiscussions,
  getDiscussion,
  updateDiscussion,
  unvoteDiscussion,
  voteDiscussion,
  deleteDiscussion,
  createReply,
  getReply,
  updateReply,
  deleteReply,
  unvoteReply,
  voteReply,
  getReplies,
};
