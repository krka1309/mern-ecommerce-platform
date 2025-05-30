const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDB = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URL);
    console.log("Mongo connected");
  } catch (err) {
    console.log("Getting erro while connected", err.message);
  }
};

module.exports = connectDB;
