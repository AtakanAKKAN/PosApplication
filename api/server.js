const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// routes
const categoryRoute = require("./routes/categories.js");
const productsRoute = require("./routes/products.js");
const billsRoute = require("./routes/bill.js");
const authRoute = require("./routes/auth.js");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDb");
  } catch (error) {
    console.log("Fail to connect mongoDb", error);
  }
};

//middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/categories", categoryRoute);
app.use("/products", productsRoute);
app.use("/bills", billsRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
