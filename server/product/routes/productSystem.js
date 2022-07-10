const express = require("express");
const router = express.Router();
const productValidation = require("../validation/productValidation");
const productModel = require("../Model/productModel");
const middleware = require("../../middleware/authMiddleware");
const { Product } = require("../Model/productModel");
// CREATE

router.post("/create", middleware, async (req, res) => {
  try {
    let user = req.tokenData;

    if (!user) return res.status(405).json("Un authorize User!");
    const productReq = await productValidation.productSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    await productModel.createProduct(
      productReq.title,
      productReq.img,
      productReq.price,
      productReq.pcs,
      productReq.desc,
      productReq.discount,
      productReq.quality,
      productReq.cart,
      productReq.like,
      productReq.lessDiscount,
      productReq.category,
      // productReq.rating,
      req.tokenData.id
    );
    res.json({ status: 200, msg: "work", response: productReq });
  } catch (err) {
    res.status(403).json({ status: 403, err: err });
  }
});

//FIND ROUTES!!

//FIND ALL

router.get("/findAll", async (req, res) => {
  try {
    const productArr = await productModel.findAllProduct();
    res.json(productArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//FIND BY ID

router.get("/findById/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.findProductById(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//FIND BY CATEGORY

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.query;
    const productArr = await productModel.findProduct(category);

    const allProductsArr = await productModel.findAllProduct();

    if (productArr.length === 0) {
      res.json(allProductsArr);
    } else {
      res.json(productArr);
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//FIND BY USER ID = CREATED BY

router.get("/my/products", middleware, async (req, res) => {
  try {
    let user = req.tokenData;
    if (!user) return res.status(403).json("Un authorize user!");
    const products = await Product.find({ createdBy: user.id });
    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//DELETE BY ID

router.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteProductById(id);
    res.json({ msg: "Product Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//UPDATE BY ID

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    await productModel.updateProduct(id, update);
    res.json({ msg: "Product update successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//Update Price + Make Deal

router.put("/deal/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    await productModel.makeDealById(id, update);
    res.json({ msg: "Price update successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

module.exports = router;
