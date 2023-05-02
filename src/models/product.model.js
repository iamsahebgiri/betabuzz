const mongoose = require('mongoose');
const { toJSONLoose, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    maker: {
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
productSchema.plugin(toJSONLoose);
productSchema.plugin(paginate);

productSchema.methods.upvote = function (userId) {
  if (this.upvotes.indexOf(userId) === -1) {
    this.upvotes.push(userId);
  }
  return this.save();
};

productSchema.methods.removeUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) === -1) {
    this.upvotes.remove(userId);
  }
  return this.save();
};

productSchema.methods.addComment = function (commentId) {
  if (this.comments.indexOf(commentId) === -1) {
    this.comments.push(commentId);
  }
  return this.save();
};

productSchema.methods.removeComment = function (commentId) {
  if (this.comments.indexOf(commentId) === -1) {
    this.comments.remove(commentId);
  }
  return this.save();
};

productSchema.methods.toProductResponse = async function () {
  return {
    name: this.name,
    image: this.image,
    description: this.description,
    link: this.link,
    commentsCount: this.comments.length,
    upvotesCount: this.upvotes.length,
    upvoted: this.upvotes.indexOf(this.maker) !== -1,
    maker: this.maker,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
