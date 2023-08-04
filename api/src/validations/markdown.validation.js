const Joi = require('joi');

const renderMarkdown = {
  body: Joi.object().keys({
    source: Joi.string().required(),
  }),
};

module.exports = {
  renderMarkdown,
};
