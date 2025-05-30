import React from "react";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Outlet } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
