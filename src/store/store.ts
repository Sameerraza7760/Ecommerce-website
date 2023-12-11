import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./../features/User/userSlice";
import adminReducer, { AdminState } from "./../features/Admin/adminSlice";
import cartReducer, { CartState } from "./../features/Cart/CartSlice";
import productReducer, {ProductState} from "./../features/Products/productSlice";
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
