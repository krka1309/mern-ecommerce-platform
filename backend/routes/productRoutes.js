const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const {
  authenticate,
  authoriseAdmin,
} = require("../middlewares/authMiddleware");
const {
  addProduct,
  updateProduct,
  removeProduct,
  getProduct,
  fetchProducts,
} = require("../controllers/productController");

router.route("/").post(authenticate, authoriseAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authoriseAdmin, formidable(), updateProduct);
router.route("/:id").delete(authenticate, authoriseAdmin, removeProduct);

router.route("/:id").get(authenticate, authoriseAdmin, getProduct);
router.route("/").get(authenticate, authoriseAdmin, fetchProducts);

module.exports = router;
