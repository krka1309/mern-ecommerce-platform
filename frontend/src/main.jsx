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

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* //Admin Routes */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="userList" element={<UserList />} />
            <Route path="categories" element={<CategoryList />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
