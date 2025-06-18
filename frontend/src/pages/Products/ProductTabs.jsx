import React, { useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import moment from "moment";
import Ratings from "./Ratings";
import Product from "./Product";
import SmallProduct from "./SmallProduct";
const ProductTabs = ({
  setRating,
  setComment,
  comment,
  rating,
  product,
  userInfo,
  submitHandler,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) {
    return <Loader />;
  }
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  //   const submitHandler = () => {
  //     console.log("Hey");
  //   };
  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>
      <section>
        {activeTab === 1 && (
          <div className="my-2 flex flex-col">
            {userInfo ? (
              <form action="" onSubmit={submitHandler}>
                <div className="flex flex-col">
                  <label htmlFor="">Rating</label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 xl:w-[40rem] rounded-lg text-black border"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label htmlFor="" className="">
                    Comment
                  </label>{" "}
                  <br />
                  <textarea
                    name=""
                    id=""
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows="3"
                    className="p-2 text-lg text-black rounded-lg xl:w-[40rem]"
                  ></textarea>
                </div>
                <button
                  className="text-white bg-pink-600 cursor-pointer px-4 py-2 rounded-lg text-lg font-bold"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/"> Sign In</Link> to write a review
              </p>
            )}
          </div>
        )}
      </section>
      {activeTab === 2 && (
        <div>
          {product.reviews.length > 0 ? (
            <div>
              {product.reviews.map((item) => {
                return (
                  <div className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5">
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0]">{item.name}</strong>
                      <p className="text-[#B0B0B0]">
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                    <p>{item.comment}</p>
                    <Ratings value={item.rating} />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No Reviews</p>
          )}
        </div>
      )}
      {activeTab === 3 && (
        <section className="flex xl:w-[40rem] md:w-[20rem]">
          {data ? (
            data.map((product) => {
              return (
                <div key={product._id} className="flex flex-row xl:w-[40rem]">
                  <SmallProduct product={product} />
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </section>
      )}
    </div>
  );
};

export default ProductTabs;
