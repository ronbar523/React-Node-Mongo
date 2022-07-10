const express = require("express");
const router = express.Router();
const categoryValidation = require("../validation/categoryValidation");
const categoryModel = require("../Model/categoryModel");
const middleware = require("../../middleware/authMiddleware");

// CREATE

router.post("/create", middleware, async (req, res) => {
  try {

    let user = req.tokenData;

    if (!user.isAdmin) return res.status(405).json("Un authorize Admin!");
    
    const categoryReq = await categoryValidation.categorySchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    await categoryModel.createCategory(categoryReq.title, categoryReq.img);

    res.json({ status: 200, msg: "work", response: categoryReq });
  } catch (err) {
    res.status(403).json({ status: 403, err: err });
  }
});

//FIND ROUTES!!

//FIND ALL

router.get("/findAll", async (req, res) => {
  try {
    const { category } = req.query;
    const categoryArr = await categoryModel.findAllCategory(category);
    res.json(categoryArr);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//FIND BY ID 

router.get("/findById/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryModel.findCategoryById(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ err: err });
  }
});


//DELETE BY ID

router.delete("/delete/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.deleteCategoryById(id);
    res.json({ msg: "Category Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});

//UPDATE BY ID

router.put("/update/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    await categoryModel.updateCategory(id, update);
    res.json({ msg: "Category update successfully" });
  } catch (err) {
    res.status(400).json({ err: err });
  }
});




module.exports = router;
