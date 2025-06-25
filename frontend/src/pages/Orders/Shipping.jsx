import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProgressSteps from "../../components/ProgressSteps";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ city, country, postalCode, address }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 step3 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label htmlFor="" className="block font-semibold text-xl mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg p-2 mt-2 border"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block font-semibold text-xl   mt-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg p-2 mt-2 border"
              placeholder="Enter city"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block font-semibold text-xl mt-2">
              Postal Code
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full rounded-lg p-2 mt-2 border"
              placeholder="Enter postal code"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block font-semibold text-xl mt-2">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg p-2 mt-2 border"
              placeholder="Enter country"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-400">
              Select Method
            </label>
            <div className="mt-2">
              <label htmlFor="" className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">PayPal or Credit Card</span>
              </label>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-pink-500 hover:bg-pink-700 text-white font-bold rounded-full w-full text-xl"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
