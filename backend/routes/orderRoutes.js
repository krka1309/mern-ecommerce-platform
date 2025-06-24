const express = require("express");
const router = express.Router();
const {
  authenticate,
  authoriseAdmin,
} = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calcTotalSale,
  calcTotalSaleByDate,
  orderById,
  markOrderAsPaid,
  markAsDelivered,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, getAllOrders);
router.route("/mine").get(authenticate, getUserOrders);
router.route("/totalOrders").get(countTotalOrders);
router.route("/totalSales").get(calcTotalSale);
router.route("/totalSaleByDate").get(calcTotalSaleByDate);
router.route("/:id").get(authenticate, orderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router.route("/:id/deliver").put(authenticate, authoriseAdmin, markAsDelivered);
module.exports = router;
