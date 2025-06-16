import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
      </div>
      <div className="p-2">
        <Link to={`/product/${product._id}`} className="font-bold text-lg">
          <h2 className="flex justify-between items-center">
            <div>{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
