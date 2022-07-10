const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },

});

const Category = mongoose.model("category", categorySchema);

const createCategory = (title, img) => {
  const newCategory = new Category({ title, img });
  return newCategory.save();
};

const findCategoryById = (id) => {
  return Category.findById(id);
};

const findAllCategory = () => {
  return Category.find();
};

const findCategory = () => {
  return Category.find();
};

const deleteCategoryById = (id) => {
  return Category.findByIdAndDelete(id);
};

const updateCategory = (id, { title, img: {url, alt} }) => {
  console.log(url);
  return Category.findByIdAndUpdate(
    id,
    {
      $set: { title: title, ["img.url"]: url, ["img.alt"]: alt },
    },
    { new: true }
  );
};

module.exports = {
  createCategory,
  findAllCategory,
  findCategoryById,
  updateCategory,
  deleteCategoryById,
  findCategory,
};

