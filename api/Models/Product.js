const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: { type: String, require: true },
    productImg: { type: String, require: true },
    productPrice: { type: Number, require: true },
    productCategory: { type: String, require: true },
    productTagColor: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;
