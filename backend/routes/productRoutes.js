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
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} = require("../controllers/productController");

router.route("/allProducts").get(fetchAllProducts);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);
router.route("/").get(fetchProducts);
router.route("/").post(authenticate, authoriseAdmin, formidable(), addProduct);

router.route("/:id/review").post(authenticate, addProductReview);
router
  .route("/:id")
  .put(authenticate, authoriseAdmin, formidable(), updateProduct);
router.route("/:id").delete(authenticate, authoriseAdmin, removeProduct);
router.route("/:id").get(getProduct);

module.exports = router;
