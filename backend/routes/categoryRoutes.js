const express = require("express");
const router = express.Router();
const {
  authenticate,
  authoriseAdmin,
} = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  readCategory,
} = require("../controllers/categoryController");

router.route("/").post(authenticate, authoriseAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authoriseAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authoriseAdmin, deleteCategory);

router.route("/categories").get(listCategories);
router.route("/:categoryId").get(readCategory);
module.exports = router;
