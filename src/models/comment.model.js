const mongoose = require('mongoose');
const { paginate, toJSONLoose } = require('./plugins');
const User = require('./user.model');

const commentSchema = mongoose.Schema(
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
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
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
commentSchema.plugin(toJSONLoose);
commentSchema.plugin(paginate);

commentSchema.methods.toCommentResponse = async function (userId) {
  return {
    id: this.id,
    content: this.content,
    upvotesCount: this.upvotes.length,
    upvoted: this.upvotes.indexOf(userId) !== -1,
    product: this.product,
    author: await User.findById(this.author),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
