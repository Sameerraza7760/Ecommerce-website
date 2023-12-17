import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./slice/userSlice";
import adminReducer, { AdminState } from "./slice/adminSlice";
import cartReducer, { CartState } from "./slice/CartSlice";
import productReducer, {ProductState} from "./slice/productSlice";
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

const productPersistConfig = {
  key: "product",
  storage: storage,
  whitelist: ["product"],
};

const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["cart"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);
const persistedProductReducer = persistReducer(
  productPersistConfig,
  productReducer
);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: persistedAdminReducer,
    product: persistedProductReducer,
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);
