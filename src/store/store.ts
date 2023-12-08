import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./../features/User/userSlice";
import adminReducer, { AdminState } from "./../features/Admin/adminSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["user"],
};
const adminPersistConfig = {
  key: "admin",
  storage: storage,
  whitelist: ["admin"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: persistedAdminReducer, // Add admin reducer here
  },
});

export const persistor = persistStore(store);
