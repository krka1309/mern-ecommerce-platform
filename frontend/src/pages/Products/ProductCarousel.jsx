import React from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Messages from "../../components/Messages";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaClock,
  FaBox,
  FaShoppingCart,
  FaStore,
  FaStar,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, isError } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  console.log(products);
  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : isError ? (
        <Messages variant="danger">
          {isError?.data?.message || isError.error}
        </Messages>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map((item) => {
            return (
              <div key={item._id}>
                <img
                  src={item.image}
                  alt=""
                  className="w-full rounded-lg h-[30rem] object-cover object-center"
                />
                <div className="flex justify-between">
                  <div className="one">
                    <h2>{item.name}</h2>
                    <p>$ {item.price}</p> <br />
                    <br />
                    <p className="w-[25rem]">{item.description}...</p>
                  </div>
                  <div className="flex justify-between w-[40rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStore className="mr-2 text-white" /> Brand:{" "}
                        {item.brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(item.createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="mr-2 text-white" /> Reviews:{" "}
                        {item.numReviews}
                      </h1>
                    </div>
                    <div className="two mr-[2rem]">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Ratings:
                        {Math.round(item.rating)}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-white " /> Quantity
                        :{item.quantity}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-white " /> In Stock:
                        {item.countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
