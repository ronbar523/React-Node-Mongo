const joi = require("joi");

const productSkeleton = {
  title: joi.string().required(),
  img: {
    url: joi.string().required(),
    alt: joi.string().required(),
  },
  price: joi.number().required(),
  pcs: joi.number().required(),
  desc: joi.string().required(),
  category: joi.string().required(),
  // rating: joi.number().required(),
};

const productSchema = joi.object(productSkeleton);

module.exports = {
  productSchema,
};
