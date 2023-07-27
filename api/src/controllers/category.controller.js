const { Product } = require('../models');
const catchAsync = require('../utils/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const aggregateResult = await Product.aggregate([
    {
      $group: {
        _id: null,
        tags: { $addToSet: '$tags' },
        categories: { $addToSet: '$category' },
      },
    },
    {
      $project: {
        _id: 0,
        tags: 1,
        categories: 1,
      },
    },
  ]);

  // Extract tags and categories from the result
  const tags = aggregateResult[0].tags || [];
  const categories = aggregateResult[0].categories || [];

  res.json({ tags, categories });
});

module.exports = {
  getAll,
};
