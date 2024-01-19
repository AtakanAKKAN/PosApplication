const User = require("../Models/User.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//! Get Users
router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Get an user
router.get("/get-an-user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Register
router.post("/create-user", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUserEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });
    if (existingUserEmail) {
      return res.status(207).json({ message: "Email already exists" });
    }
    if (existingUserName) {
      return res.status(206).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json("User added succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(403).json("Invalid password!");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Update Users
router.put("/update-user", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body.userId }, req.body);
    res.status(200).json("User updated succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Delete Users
router.delete("/delete-user", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.userId });
    res.status(200).json("User deleted succesfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
