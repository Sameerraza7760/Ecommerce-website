import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import {Adminauth} from "../../types/types"

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: {
    id: null,
    email: null,
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});



export const { setUser } = userSlice.actions;
export default userSlice.reducer;
