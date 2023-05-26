const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    expires: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

imageSchema.plugin(toJSON);

/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
