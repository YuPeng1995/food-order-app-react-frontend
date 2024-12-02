import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // 存储购物车商品，key 为商品 ID，value 为数量
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      if (state.items[id]) {
        state.items[id] = Math.max(state.items[id] - 1, 0); // 防止负数
        if (state.items[id] === 0) {
          delete state.items[id]; // 如果数量为 0，删除该商品
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
