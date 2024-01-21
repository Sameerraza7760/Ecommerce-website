import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./slice/CartSlice";
import adminReducer from "./slice/adminSlice";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";

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
  key: "Product",  
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
