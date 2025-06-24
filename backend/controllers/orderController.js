const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}
const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No Order items");
    }
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingProductFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      if (!matchingProductFromDB) {
        res.status(400);
        throw new Error("No matching product found");
      }
      return {
        ...itemFromClient,
        price: matchingProductFromDB.price,
        product: itemFromClient._id,
        _id: undefined,
      };
    });
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const allOrders = await Order.find({});
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id });
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
});

const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const numOrders = await Order.countDocuments();
    res.json({ numOrders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const calcTotalSale = asyncHandler(async (req, res) => {
  try {
    const userProduct = await Order.find({});
    const totalSale = userProduct.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    res.status(200).json({ totalSale });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const calcTotalSaleByDate = asyncHandler(async (req, res) => {
  try {
    const saleByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(saleByDate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const orderById = asyncHandler(async (req, res) => {
  try {
    const userOrder = await Order.findById(req.params.id);
    if (userOrder) {
      res.status(200).json(userOrder);
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isPaid = true),
        (order.paidAt = Date.now()),
        (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        });
      const updateOrder = await Order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(400);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const markAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      (order.isDelivered = true), (order.deliveredAt = Date.now());

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(400);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calcTotalSale,
  calcTotalSaleByDate,
  orderById,
  markOrderAsPaid,
  markAsDelivered,
};
