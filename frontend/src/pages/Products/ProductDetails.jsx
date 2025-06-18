import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import HeartIcon from "./HeartIcon";
import Messages from "../../components/Messages";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  //   console.log("userInfo", userInfo);
  const {
    data: product,
    isLoading,
    refetch,
    isError,
  } = useGetProductDetailsQuery(productId);

  //   console.log("product", product);
  const navigate = useNavigate();
  const [createReview, { isLoading: productReviewLoading }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({ productId, rating, comment }).unwrap();
      //   console.log("res", res);
      refetch();
      toast.success(res);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      <div className="ml-[10rem] mt-[3rem] text-lg font-bold">
        <Link
          to="/"
          className="ml-[2rem] mt-[2rem] font-bold text-lg hover:underline"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Messages variant="danger">
          {isError?.data?.message || isError?.message}
        </Messages>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            <div className="flex">
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[25rem] lg:w-[20rem] md:w-[20rem] sm:w-[15rem] mr-[2rem] object-cover"
              />
              <HeartIcon product={product} />
              <div className="flex justify-between flex-col">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="xl:w-[30rem] md:w-[25rem] lg:w-[30rem] sm:w-[15rem] text-[#B0B0B0] ">
                  {product.description}
                </p>
                <p className="font-extrabold text-5xl mb-6">
                  $ {product.price}
                </p>
                <div className="flex justify-between items-center ">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2" /> Brand: {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="mr-2" /> Added:{" "}
                      {moment(product.updatedAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2" /> Reviews: {product.numReviews}
                    </h1>
                  </div>
                  <div>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2" /> Ratings: {product.rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2" /> Quantity:{" "}
                      {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="mr-2" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-between flex-wrap">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  {product.countInStock > 0 && (
                    <div>
                      <select
                        name=""
                        id=""
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="text-black rounded-lg p-2 w-[6rem]"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="text-[1.2rem] font-bold">
                  <button
                    className="bg-pink-600 cursor-pointer px-4 py-2 rounded-lg"
                    disable={product.countInStock === 0}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTabs
                comment={comment}
                setComment={setComment}
                rating={rating}
                setRating={setRating}
                productReviewLoading={productReviewLoading}
                userInfo={userInfo}
                product={product}
                submitHandler={submitHandler}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
