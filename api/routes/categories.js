const Category = require("../Models/Category.js");
const express = require("express");
const router = express.Router();

//! Get Category
router.get("/get-all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Create Category
router.post("/create-category", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("category created succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Update category
router.put("/update-category", async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body);
    res.status(200).json("category update succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Delete Category
router.delete("/delete-category", async (req, res) => {
  try {
    await Category.findOneAndDelete({ _id: req.body.categoryId });
    res.status(200).json("category deleted succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

