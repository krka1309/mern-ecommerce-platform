import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes />
        ) : (
          <div className="h-3rem">
            <div className="w-6 h-1 bg-white my-1"></div>
            <div className="w-6 h-1 bg-white my-1"></div>
            <div className="w-6 h-1 bg-white my-1"></div>
          </div>
        )}
      </button>
      {isMenuOpen && (
        <section className="bg-[#151515] fixed right-9 top-5 p-4">
          <ul className="list-none mt-2 ">
            <li className="">
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#5c5654] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#5c5654] rounded-sm"
                to="/admin/categories"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#5c5654] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#5c5654] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#5c5654] rounded-sm"
                to="/admin/userList"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li className="">
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-[#5c5654] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
