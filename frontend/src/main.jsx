import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductsList from "./pages/Admin/ProductsList.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Favourites from "./pages/Products/Favourites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import UserOrders from "./pages/User/UserOrders.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PayPalScriptProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/user-orders" element={<UserOrders />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route index={true} path="/" element={<Home />} />
            <Route path="/favourite" element={<Favourites />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shop" element={<Shop />} />

            {/* //Admin Routes */}
            <Route path="/admin" element={<AdminRoutes />}>
              <Route path="userList" element={<UserList />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="productlist" element={<ProductsList />} />
              <Route path="allproductslist" element={<AllProducts />} />
              <Route path="orderlist" element={<OrderList />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="update/product/:_id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </PayPalScriptProvider>
  </BrowserRouter>
);
