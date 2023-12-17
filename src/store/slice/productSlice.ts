import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "types/types";

export interface ProductState {
  product: Product[] | null;
}

const initialState: ProductState = {
  product: null,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[] | null>) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
