import React from "react";
import { getProductsFromLocalStorage } from "../../Utils/localStorage";
import { useSelector } from "react-redux";

const FavouriteCount = () => {
  const favourites = useSelector((state) => state.favourites);

  return (
    <div className="absolute top-8 left-6">
      <span className="bg-pink-700 rounded-full px-1 py-0">
        {favourites.length}
      </span>
    </div>
  );
};

export default FavouriteCount;
