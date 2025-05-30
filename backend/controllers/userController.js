const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(userName);
  if (!userName || !email || !password) {
    res
      .status(400)
      .json({ message: "Please fill all fields, they are manadatory" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404).json({ message: "user already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    try {
      generateToken(res, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        isAdmin: newUser.isAdmin,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Invalid data");
    }
  }
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
      return;
    }
  }
});

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     res.status(404).json("User not found");
//   }

//   const isValidPassword = await bcrypt.compare(password, user.password);
//   if (isValidPassword) {
//     generateToken(res, user._id);
//     res.status(200).json("logged in");
//   }
// });

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout success" });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword || user.password;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json({ message: "User not exists" });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Admin cannot be deleted");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User removed!!" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "user not found" });
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.send(400).json({ message: "User does not existe" });
  }
});

module.exports = {
  getUsers,
  createUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUser,
  getUserById,
  updateUserById,
};
