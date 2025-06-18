import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;
      const existingProduct = state.cartItems.find(
        (x) => x._id === action.payload._id
      );
      if (existingProduct) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existingProduct._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
  },
});
