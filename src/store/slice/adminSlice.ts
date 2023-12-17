import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Adminauth } from "../../types/types";

export interface AdminState {
  admin: Adminauth[] | null;
}

const initialState: AdminState = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Adminauth[] | null>) => {
      state.admin = action.payload;
    },
  },
});

export const { setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
