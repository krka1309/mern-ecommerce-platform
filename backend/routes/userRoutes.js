const express = require("express");
const {
  getUsers,
  createUser,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUser,
  getUserById,
  updateUserById,
} = require("../controllers/userController");
const {
  authoriseAdmin,
  authenticate,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(authenticate, authoriseAdmin, getUsers);
router.route("/").post(createUser);
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUser);

//ADMIN ROUTER

router
  .route("/:id")
  .delete(authenticate, authoriseAdmin, deleteUser)
  .get(authenticate, authoriseAdmin, getUserById)
  .put(authenticate, authoriseAdmin, updateUserById);
module.exports = router;
