const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },

  pcs: {
    type: Number,
    required: true,
  },

  // rating: {
  //   type: Number,
  //   required: true,
  // },

  desc: {
    type: String,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
    default: 0,
  },

  cart: {
    type: Boolean,
    required: true,
    default: false,
  },

  like: {
    type: Boolean,
    required: true,
    default: false,
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },

  lessDiscount: {
    type: Number,
    required: true,
    default: 0,
  },

  category: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

const Product = mongoose.model("product", productSchema);

const createProduct = (
  title,
  img,
  price,
  pcs,
  desc,
  discount,
  cart,
  like,
  quantity,
  lessDiscount,
  category,
  // rating,
  createdBy,
  createdAt
) => {
  const newProduct = new Product({
    title,
    img,
    price,
    pcs,
    desc,
    discount,
    lessDiscount,
    cart,
    like,
    quantity,
    category,
    // rating,
    createdBy,
    createdAt,
  });
  return newProduct.save();
};

const findAllProduct = () => {
  return Product.find();
};

const findProductById = (id) => {
  return Product.findById(id);
};

const findProduct = (category) => {
  const filter = category ? { category } : {};
  return Product.find(filter);
};

const findProductByTitle = (title) => {
  return Product.find({ title });
};

const deleteProductById = (id) => {
  return Product.findByIdAndDelete(id);
};

const updateProduct = (
  id,
  {
    title,
    img: { url, alt },
    price,
    desc,
    pcs,
    category,
    // rating,
  }
) => {
  return Product.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title,
        ["img.url"]: url,
        ["img.alt"]: alt,
        price: price,
        desc: desc,
        pcs: pcs,
        category: category,
        // rating: rating,
      },
    },
    { new: true }
  );
};

const makeDealById = (id, { price, lessDiscount, discount }) => {
  return Product.findByIdAndUpdate(
    id,
    {
      $set: {
        price: price,
        lessDiscount: lessDiscount,
        discount: discount,
      },
    },
    { new: true }
  );
};

module.exports = {
  findAllProduct,
  createProduct,
  findProductById,
  findProduct,
  deleteProductById,
  updateProduct,
  findProductByTitle,
  makeDealById,
  Product,
};
