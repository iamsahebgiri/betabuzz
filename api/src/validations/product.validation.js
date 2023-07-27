const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
    tagline: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    category: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    link: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      link: Joi.string().required(),
      tagline: Joi.string(),
      tags: Joi.array().items(Joi.string()),
      category: Joi.string(),
      description: Joi.string(),
      image: Joi.string(),
    })
    .min(1),
};

const voteProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
};

const unvoteProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const uploadImage = {
  file: Joi.object().required(),
};

const removeImage = {
  image: Joi.string().required(),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  voteProduct,
  unvoteProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  removeImage,
};
