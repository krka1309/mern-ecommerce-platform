import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import favouriteReducer from "../redux/features/favourites/favouritesSlice";
import { getProductsFromLocalStorage } from "../Utils/localStorage";
import cartReducer from "../redux/features/cart/cartSlice";
const favourites = getProductsFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favourites: favouriteReducer,
    cart: cartReducer,
  },
  preloadedState: favourites,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
