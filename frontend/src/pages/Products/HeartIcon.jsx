import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourites,
  removeProduct,
  setFavourites,
} from "../../redux/features/favourites/favouritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addProductsToLocalStorage,
  removeProductFromLocalStorage,
  getProductsFromLocalStorage,
} from "../../Utils/localStorage";
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites) || [];
  const isFavourite = favourites.some((p) => p._id === product._id);

  useEffect(() => {
    const favouritesFromLocalStorage = getProductsFromLocalStorage();
    dispatch(setFavourites(favouritesFromLocalStorage));
  }, [isFavourite]);

  const toggleFavourites = () => {
    if (isFavourite) {
      dispatch(removeProduct(product));
      removeProductFromLocalStorage(product);
    } else {
      dispatch(addToFavourites(product));
      addProductsToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-4 right-5 cursor-pointer "
      onClick={toggleFavourites}
    >
      {isFavourite ? (
        <FaHeart className="text-pink-600 text-[1.5rem]" />
      ) : (
        <FaRegHeart className="text-pink-700 text-[1.5rem]" />
      )}
    </div>
  );
};

export default HeartIcon;
