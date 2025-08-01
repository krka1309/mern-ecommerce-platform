import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import HeartIcon from "./HeartIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
const ProductsCard = ({ item }) => {
  const addTocartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };
  const dispatch = useDispatch();
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800">
      <section className="relative">
        <Link to={`/product/${item._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {item?.brand}
          </span>
          <img
            src={item.image}
            alt={item.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={item} />
      </section>
      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-white dark:text-white">
            {item.name}
          </h5>
          <p className="text-black font-semibold text-pink-500">
            ${" "}
            {item.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <p className="mb-3 font-normal text-[#CFCFCF]">
          {item?.description?.substring(0, 60)}...
        </p>
        <section className="flex justify-between items-center">
          <Link
            to={`/product/${item._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <button
            className="p-2 rounded-full "
            onClick={() => addTocartHandler(item, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductsCard;
