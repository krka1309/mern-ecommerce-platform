const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./configs/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middlewares/asyncHandler");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

// ✅ Use path.resolve() to get the project root
// const __dirname = path.resolve();
console.log("__dirname", __dirname);

// ✅ Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/upload", uploadRoutes);

// Error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "We are ok" });
});

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
