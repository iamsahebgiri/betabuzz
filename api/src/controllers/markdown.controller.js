const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { markdownService } = require('../services');

const renderMarkdown = catchAsync(async (req, res) => {
  const markdown = await markdownService.renderMarkdown(req.body.source);
  res.status(httpStatus.OK).send(markdown);
});

module.exports = {
  renderMarkdown,
};
