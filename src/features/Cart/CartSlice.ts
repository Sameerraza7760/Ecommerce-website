import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "types/types";

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<CartItem>) => {
      if (!state.cart) {
        state.cart = [];
      }
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.cart.push({ ...newItem, quantity: 1 });
      }
    },

    setRemoveAllItems: (state) => {
      state.cart = [];
    },

    setRemoveCartItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCartItem, setRemoveAllItems, setRemoveCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
