const joi = require("joi");

const categorySkeleton = {
  title: joi.string().required(),
  img: {
    url: joi.string().required(),
    alt: joi.string().required(),
  },
};

const categorySchema = joi.object(categorySkeleton)

module.exports = {
    categorySchema
}