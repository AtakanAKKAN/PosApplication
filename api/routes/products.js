const Product = require("../Models/Product.js");
const express = require("express");
const router = express.Router();

//! Get Product
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Create Product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Product added succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Update Product
router.put("/update-product", async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body);
    res.status(200).json("Product update succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Delete Product
router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Product Delete succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
