const mongoose = require('mongoose');
const { toJSONLoose, paginate } = require('./plugins');
const User = require('./user.model');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
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
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
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
  },
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSONLoose);
productSchema.plugin(paginate);

productSchema.methods.addUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) === -1) {
    this.upvotes.push(userId);
  }
  return this.save();
};

productSchema.methods.removeUpvote = function (userId) {
  if (this.upvotes.indexOf(userId) !== -1) {
    this.upvotes.pull(userId);
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
  if (this.comments.indexOf(commentId) !== -1) {
    this.comments.pull(commentId);
  }
  return this.save();
};

productSchema.pre('save', async function (next) {
  this.views += 1;
  next();
});

productSchema.methods.toProductResponse = async function (userId) {
  return {
    id: this.id,
    name: this.name,
    tagline: this.tagline,
    image: this.image,
    description: this.description,
    link: this.link,
    views: this.views,
    tags: this.tags,
    category: this.category,
    commentsCount: this.comments.length,
    upvotesCount: this.upvotes.length,
    upvoted: this.upvotes.indexOf(userId) !== -1,
    maker: await User.findById(this.maker),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
