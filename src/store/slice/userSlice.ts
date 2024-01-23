import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "firebase/auth";
import { User } from "../../types/types";

export interface UserState {
  user: UserProfile | null;
}

const initialState: UserState = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
