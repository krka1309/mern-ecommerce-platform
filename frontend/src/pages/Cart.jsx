import React from "react";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SmallProduct from "./Products/SmallProduct";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <div className="container flex items-start flex-wrap mx-auto mt-8">
      {cartItems.length === 0 ? (
        <>
          Cart is Empty <Link to="/shop">Go To Shop </Link>
        </>
      ) : (
        <>
          <div className="flex flex-col w-[80%]">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {cartItems.map((item) => {
              return (
                <div
                  key={item._id}
                  className="flex items-center mb-[1rem] pb-2"
                >
                  <div className="w-[7rem] h-[7rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      id=""
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="w-full p-1 border rounded text-black"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => {
                        return (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <button className="mr-[5rem] text-white">
                      <FaTrash
                        className="ml-[1rem] mt-[0.5rem]"
                        onClick={() => removeHandler(item._id)}
                      />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-8 w-[40rem]">
              <div className="p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  Items {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </h2>
                <div className="text-2xl font-bold">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
                <button
                  className="bg-pink-500 mt-4 py-2 px-4 text-lg w-full rounded-lg"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
