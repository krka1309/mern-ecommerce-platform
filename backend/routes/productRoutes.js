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
} = require("../controllers/productController");

router.route("/allProducts").get(fetchAllProducts);
router.route("/").post(authenticate, authoriseAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authoriseAdmin, formidable(), updateProduct);
router.route("/:id").delete(authenticate, authoriseAdmin, removeProduct);

router.route("/:id").get(getProduct);
router.route("/").get(fetchProducts);

module.exports = router;
