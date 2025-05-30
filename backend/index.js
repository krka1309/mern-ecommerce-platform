const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middlewares/asyncHandler");
const PORT = process.env.PORT || 5000;
const productRoutes = require("./routes/productRoutes");

connectDB();
const app = express();
app.use(express.json());

app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, (req, res) => {
  console.log("App is listening", PORT);
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "We are ok" });
});
