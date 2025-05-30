const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log(req.user);
      //   res.status(200).json({ userId: req.user.user_id });
      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorised- catch block" });
      throw new Error("Not Authorised");
    }
  } else {
    res.status(401).json({ message: "Not Authorised- else block" });
    throw new Error("Not Authorised, token not found");
  }
});

const authoriseAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      //   res.status(200).json({ message: "Authenticated" });
      next();
    } catch (error) {
      res.send(404).json({ message: "Not Authorised - admin" });
      throw new Error("Not Authorised, you are not admin");
    }
  } else {
    res.json({ message: "Not Admin" });
  }
});

module.exports = { authenticate, authoriseAdmin };
