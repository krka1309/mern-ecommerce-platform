const asyncHandler = require("express-async-handler");
const Products = require("../models/productModel");

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, brand, price, quantity, category, image } =
    req.fields;
  switch (true) {
    case name:
      return `name is required`;
    case description:
      return `description is required`;
    case brand:
      return `brand is required`;
    case quantity:
      return `quantity is required`;
    case price:
      return `price is required`;
    case image:
      return `image is required`;
    case category:
      return `category is required`;
  }

  const product = new Products({ ...req.fields });
  await product.save();
  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  try {
    const existingProduct = await Products.findById(req.params.id);
    if (!existingProduct) {
      res.status(400).json({ message: "Product not found" });
    } else {
      try {
        const updatedProduct = await Products.findByIdAndUpdate(
          req.params.id,
          { ...req.fields },
          { new: true }
        );
        await updatedProduct.save();
        res.status(200).json(updatedProduct);
      } catch (error) {
        throw new Error("Getting error while updating");
      }
    }
  } catch (error) {
    throw new Error("Getting error while updating product", error);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  const productToRemove = await Products.findById(req.params.id);
  if (!productToRemove) {
    res.json({ message: "Product does not exists" });
  } else {
    const remove = await Products.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(remove);
  }
  // res.status(200).json({ message: "Removed" });
});

const getProduct = asyncHandler(async (req, res) => {
  const findProduct = await Products.findById(req.params.id);
  if (!findProduct) {
    res.json({ message: "Product does not exist" });
  } else {
    try {
      res.status(200).json(findProduct);
    } catch (error) {
      throw new Error("Server error");
    }
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Products.countDocuments({ ...keyword });
  const products = await Products.find({ ...keyword }).limit(pageSize);

  res.json({
    products,
    page: 1,
    pages: Math.ceil(count / pageSize),
    hasMore: false,
  });
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Products.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.json({ message: "Getting error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  // try {
  const { rating, comment } = req.body;
  const product = await Products.findById(req.params.id);
  // console.log("product", product);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Already reviewed");
    }
    const review = {
      name: req.user.userName,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json("Review added");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

  //  catch (error) {
  //   res.status(400).json({ message: "Getting error" });
  //   throw new Error("Getting error while fetching");
  // }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await Products.find({}).sort({ rating: -1 }).limit(4);
    res.status(200).json(topProducts);
  } catch (error) {
    res.status(400).json({ message: "server error" });
    throw new Error("Server error");
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const newProducts = await Products.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(400).json({ message: "error while fetching new products" });
    throw new Error("Server error");
  }
});

module.exports = {
  addProduct,
  updateProduct,
  removeProduct,
  getProduct,
  fetchProducts,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
};
