const Bill = require("../Models/Bills.js");
const express = require("express");
const router = express.Router();

//! Get Bill
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Create Bill
router.post("/create-bill", async (req, res) => {
  try {
    const newBills = Bill(req.body);
    await newBills.save();
    res.status(200).json("Bill added succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Bill Update
router.put("/update-bill", async (req, res) => {
  try {
    await Bill.findOneAndUpdate({ _id: req.body.billId }, req.body);
    res.status(200).json("Bill updated succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Bill Delete
router.delete("/delete-bill", async (req, res) => {
  try {
    await Bill.findOneAndDelete({ _id: req.body.billId });
    res.status(200).json("Bill deleted succesfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;

// customerName: { type: String, require: true },
//     customerPhoneNumber: { type: String, require: true },
//     paymentMode: { type: String, require: true },
//     cartItems: { type: Array, require: true },
//     subTotal: { type: Number, require: true },
//     tax: { type: Number, require: true },
//     totalAmonut: { type: Number, require: true },
