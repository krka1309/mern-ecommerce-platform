import React from "react";
import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favourites/favouritesSlice";
import Product from "./Product";

const Favourites = () => {
  const favourites = useSelector(selectFavoriteProduct);
  console.log("favourites", favourites);
  return (
    <div className="text-lg ml-[10rem] mt-[3rem] font-bold">
      <h1>FAVOURITE PRODUCTS</h1>
      <div className="flex flex-wrap">
        {favourites.map((item) => {
          return <Product product={item} />;
        })}
      </div>
    </div>
  );
};

export default Favourites;
