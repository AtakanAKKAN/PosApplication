import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [],
    total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0,
    tax: 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.total += action.payload.productPrice;
    },

    deleteCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.total -= action.payload.productPrice * action.payload.quantity;
    },

    plusCartItem: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.total += findCartItem.productPrice;
    },

    minusCartItem: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      findCartItem.quantity = findCartItem.quantity - 1;

      state.total -= findCartItem.productPrice;
    },

    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const { addProduct, deleteCart, plusCartItem, minusCartItem, reset } =
  cartSlice.actions;
export default cartSlice.reducer;
