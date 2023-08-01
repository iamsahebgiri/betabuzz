const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Boolean,
      required: true,
      default: true,
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

imageSchema.plugin(toJSON);

/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
