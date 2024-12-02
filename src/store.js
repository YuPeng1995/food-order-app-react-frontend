import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // 注册购物车的 reducer
  },
});
