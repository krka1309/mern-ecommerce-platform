import React from "react";
import { useParams, Link } from "react-router";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import Messages from "./Messages";
import SmallProducts from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";
const Header = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>ERROR</h1>;
  }
  console.log(data);
  return (
    <div className="flex justify-between">
      <div className="xl:block lg:hidden md:hidden sm:hidden">
        <div className="grid grid-cols-2">
          {data.products?.map((product) => {
            return (
              <div key={product._id}>
                <SmallProducts product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <ProductCarousel />
    </div>
  );
};

export default Header;
