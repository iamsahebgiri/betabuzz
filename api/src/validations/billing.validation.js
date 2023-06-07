const Joi = require('joi');

const upgradeBilling = {
  query: Joi.object().keys({
    priceId: Joi.string(),
  }),
};

module.exports = {
  upgradeBilling,
};
