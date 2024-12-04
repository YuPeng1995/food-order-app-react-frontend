import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartSlice";
import authReducer from "./redux/authReducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // 注册购物车的 reducer
  },
  reducer: {
    auth: authReducer, // 注册购物车的 reducer
  },
});
