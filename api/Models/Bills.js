const mongoose = require("mongoose");

const BillsSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true },
    customerPhoneNumber: { type: String, require: true },
    paymentMode: { type: String, require: true },
    cartItems: { type: Array, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    totalAmonut: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const Bills = mongoose.model("bills", BillsSchema);
module.exports = Bills;
