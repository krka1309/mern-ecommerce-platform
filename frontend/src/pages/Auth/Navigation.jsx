import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/features/auth/authSlice";
import {
  useLoginMutation,
  useLogoutMutation,
} from "../../redux/api/userApiSlice.js";
import FavouriteCount from "../Products/FavouriteCount.jsx";

const Navigation = () => {
  const [showDropdown, setDropdown] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const { cartItems } = useSelector((state) => state.cart);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const toggleDropDown = () => {
    setDropdown(!showDropdown);
  };
  const closeSideBar = () => {
    setShowSidebar(false);
  };
  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={26} className="mr-2 mt-[3rem]" />
          <span className="text-white nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={26} className="mr-2 mt-[3rem]" />
          <span className="text-white nav-item-name mt-[3rem]">
            Shopping
          </span>{" "}
        </Link>
        <div>
          <Link
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart size={26} className="mr-2 mt-[3rem]" />
            <span className="text-white nav-item-name mt-[3rem]">
              Cart
            </span>{" "}
            <div className="absolute top-8 left-6">
              <span className="bg-pink-700 rounded-full px-1 py-0">
                {cartItems.length}
              </span>
            </div>
          </Link>
        </div>

        <Link
          to="/favourite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart size={26} className="mr-2 mt-[3rem]" />
          <FavouriteCount />
          <span className="text-white nav-item-name mt-[3rem]">
            Favourite
          </span>{" "}
        </Link>
      </div>
      <div>
        <button
          onClick={toggleDropDown}
          className="flex item-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white bold">{userInfo.userName}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 mt-4} ${
                showDropdown ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={showDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {showDropdown && userInfo && (
          <ul
            // className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-500} ${
            //   !userInfo.isAdmin ? "-top-20" : "-top-80"
            // }`}
            className="right-0 mt-2 mr-14 space-y-2 bg-gray text-gray-500"
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categories"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100 text-white"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-600 text-white"
              >
                Profie
              </Link>
            </li>
            <li>
              <Link
                className="block px-4 py-2 hover:bg-gray-600 text-white"
                onClick={logOutHandler}
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin size={26} className="mr-2 mt-[3rem]" />
              <span className="text-white nav-item-name mt-[3rem]">
                Login
              </span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} className="mr-2 mt-[3rem]" />
              <span className="text-white nav-item-name mt-[3rem]">
                Register
              </span>{" "}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
