const mongoose = require('mongoose');
const { toJSONLoose, paginate } = require('./plugins');
const User = require('./user.model');

const discussionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
      },
    ],
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
discussionSchema.plugin(toJSONLoose);
discussionSchema.plugin(paginate);

discussionSchema.methods.addUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) === -1) {
    this.upvotes.push(userId);
  }
  return this.save();
};

discussionSchema.methods.removeUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) !== -1) {
    this.upvotes.pull(userId);
  }
  return this.save();
};

discussionSchema.methods.addReply = function (replyId) {
  if (this.replies.indexOf(replyId) === -1) {
    this.replies.push(replyId);
  }
  return this.save();
};

discussionSchema.methods.removeReply = function (replyId) {
  if (this.replies.indexOf(replyId) !== -1) {
    this.replies.remove(replyId);
  }
  return this.save();
};

discussionSchema.pre('save', async function (next) {
  this.update({ $inc: { views: 1 } });
  next();
});

discussionSchema.methods.toDiscussionResponse = async function (userId) {
  return {
    id: this.id,
    title: this.title,
    content: this.content,
    repliesCount: this.replies.length,
    upvotesCount: this.upvotes.length,
    upvoted: this.upvotes.indexOf(userId) !== -1,
    author: await User.findById(this.author),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * @typedef Discussion
 */
const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
