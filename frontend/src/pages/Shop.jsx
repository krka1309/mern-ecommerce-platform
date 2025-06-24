import React, { useEffect, useState } from "react";
import { useGetFilterProductsQuery } from "../redux/api/productApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setCheck,
  setProducts,
} from "../redux/features/shop/ShopSlice";
import Loader from "../components/Loader";
import ProductsCard from "./Products/ProductsCard";
const Shop = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const { categories, products, checked, radio } = useSelector(
    (state) => state?.shop
  );
  const { data: categoriesQuery, isLoading, isError } = useGetCategoryQuery();
  //   console.log("categorQuery", categoriesQuery);
  const filterProductsQuery = useGetFilterProductsQuery({
    checked,
    radio,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      dispatch(setCategories(categoriesQuery));
    }
  }, [categoriesQuery, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filterProductsQuery.isLoading) {
        const filteredProducts = filterProductsQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, []);

  const handleBrandClick = (brand) => {
    const productsByBrand = filterProductsQuery.data?.filter(
      (item) => item.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setCheck(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filterProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto ml-[2rem]">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter By Categories
            </h2>
            <div className="p-5 w-[15rem]">
              {categoriesQuery?.map((item) => (
                <div key={item._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, item._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor=""
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {item.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="h-4 text-center py-2 bg-black rounded-full mb-2">
              Filter By Brands
            </h2>
            <div className="p-5">
              {uniqueBrands.map((item) => (
                <>
                  <div className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={item}
                      name="brand"
                      onChange={() => handleBrandClick(item)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor=""
                      className="ml-2 text-sm text-white text-gray-300 dark:text-gray-300 font-medium"
                    >
                      {item}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="h-4 text-center py-2 bg-black rounded-full mb-2">
              Filter By Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter a price"
                value={priceFilter}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="p-3">
            <h2 className="h-4 text-center mb-2">{products.length} Products</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products.map((item) => (
                  <div className="p-3">
                    {" "}
                    <ProductsCard item={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
