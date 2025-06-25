import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import ProgressSteps from "../../components/ProgressSteps";
import Messages from "../../components/Messages";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, isError }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, cart.shippingAddress.address]);
  console.log("cart", cart);

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Messages>Your cart is empty</Messages>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left align-top">Product</td>
                  <td className="px-1 py-2 text-left align-top">Quantity</td>
                  <td className="px-1 py-2 text-left align-top">Price</td>
                  <td className="px-1 py-2 text-left align-top">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        className="w-16 h-16 object-cover"
                        alt={item.name}
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.qty}</td>
                    <td className="p-2">${item.price}</td>
                    <td className="p-2">
                      ${(item.price * item.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818]">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items: </span> $
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping: </span>$
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax: </span>$
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total: </span>$
                {cart.totalPrice}
              </li>
            </ul>
            {isError && <Messages variant="danger">{isError.message}</Messages>}

            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </div>
          </div>
          <button
            className="text-white bg-pink-500 w-full px-4 py-2 rounded-full text-xl "
            disabled={cart.cartItems.length === 0}
            type="submit"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
