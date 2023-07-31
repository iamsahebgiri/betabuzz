const mongoose = require('mongoose');
const { paginate, toJSONLoose } = require('./plugins');
const User = require('./user.model');

const replySchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion',
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply',
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
replySchema.plugin(toJSONLoose);
replySchema.plugin(paginate);

replySchema.methods.addUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) === -1) {
    this.upvotes.push(userId);
  }
  return this.save();
};

replySchema.methods.removeUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) !== -1) {
    this.upvotes.pull(userId);
  }
  return this.save();
};

replySchema.methods.toReplyResponse = async function (userId) {
  return {
    id: this.id,
    content: this.content,
    upvotesCount: this.upvotes.length,
    upvoted: this.upvotes.indexOf(userId) !== -1,
    discussion: this.discussion,
    parent: this.parent === undefined ? null : this.parent,
    author: await User.findById(this.author),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * @typedef Reply
 */
const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
