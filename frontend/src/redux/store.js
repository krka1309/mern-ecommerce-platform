import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import favouriteReducer from "../redux/features/favourites/favouritesSlice";
import { getProductsFromLocalStorage } from "../Utils/localStorage";

const favourites = getProductsFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favourites: favouriteReducer,
  },
  preloadedState: favourites,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
