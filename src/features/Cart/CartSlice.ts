import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "types/types";

export interface CartState {
  product: Product[] | null;
}

const initialState: CartState = {
  cart: null,
};

const cartSlice = createSlice({
  name: "CartItem",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<Product[] | null>) => {
      state.cart = action.payload;
    },
  },
});
