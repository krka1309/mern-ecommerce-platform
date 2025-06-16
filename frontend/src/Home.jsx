import React from "react";
import Header from "./components/Header";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Product from "./pages/Products/Product";
import Messages from "./components/Messages";
import { useParams, Link } from "react-router";
const Home = () => {
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
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Messages variant="danger">{isError.error}</Messages>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-between flex-wrap mt-[2rem]">
              {data.products.map((product) => {
                return (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
