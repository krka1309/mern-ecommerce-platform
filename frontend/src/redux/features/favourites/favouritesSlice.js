import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: [],
  reducers: {
    addToFavourites: (state, action) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavourites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavourites, removeProduct, setFavourites } =
  favouriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favourites;
export default favouriteSlice.reducer;
