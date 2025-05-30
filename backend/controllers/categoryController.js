const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (!name) {
      res.status(400).json({ message: "Name should be provided" });
    }
    if (existingCategory) {
      res.status(400).json({ message: "Category already exists" });
    }
    const category = await Category.create({ name });
    res.status(200).json(category);
    console.log(name);
  } catch (error) {
    console.log(error.data.message);
    res.status(400).json({ message: "Getting error while creating category" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  // const id = ;
  const findExisting = await Category.findById(req.params.categoryId);
  console.log(findExisting, "findExisting");
  if (!findExisting) {
    res.status(400).json({ message: "category does not exist" });
  } else {
    try {
      findExisting.name = req.body.name || findExisting.name;
      const updatedCategory = await findExisting.save();
      res.status(200).json(updatedCategory);
      // const updatedCategoryName = await Category.updateOne({
      //   name: req.body.name || findExisting.name,
      // });
      // res.status(200).json(updatedCategoryName);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "Getting erorr at updating catgeory controller" });
    }
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const getCategory = await Category.findById(req.params.categoryId);
  if (!getCategory) {
    res.status(400).json({ message: "Category not found" });
  } else {
    try {
      await Category.deleteOne({ _id: getCategory._id });
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      throw new Error("Getting error while deleting");
    }
  }
});

const listCategories = asyncHandler(async (req, res) => {
  const getAllCategories = await Category.find({});

  res.status(200).json(getAllCategories);
});

const readCategory = asyncHandler(async (req, res) => {
  const getCategory = await Category.findById(req.params.categoryId);
  if (!getCategory) {
    throw new Error("Category now found");
  } else {
    try {
      res.status(200).json(getCategory);
    } catch (error) {
      throw new Error("getting erorr while fetching");
    }
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
  readCategory,
};
