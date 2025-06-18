import React from "react";
import { Link } from "react-router";
import HeartIcon from "./HeartIcon";
const SmallProduct = ({ product }) => {
  console.log(product.image);
  return (
    <div className="w-[20rem] ml-[2rem] p-3 ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[20rem] h-[15rem] object-cover mb-2"
        />
        <HeartIcon product={product} />
        <div className="p-54">
          <Link className="" to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:full dark:bg-pink-900 dark:text-pink-300">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
