import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "../../Pages/Accounts/Signin/Signin";
import Signup from "../../Pages/Accounts/Signup/Signup";
import Home from "../../Pages/Home/Home";
import Profile from "../../Pages/Profile/Profile";
import Shop from "../../Pages/Shop/Shop";
import AdminDashboard from "../../Pages/Admininterface/AdminDashboard/AdminDashboard";
import Adminprofile from "../../Pages/Admininterface/Adminprofile/Adminprofile";
import CreateOrder from "../../Pages/Admininterface/CreateOrder/CreateOrder";
import ManegeOrder from "../../Pages/Admininterface/MenegeOrder/ManegeOrder";
import Cart from "../../Pages/Cart/Cart";
import Notification from "../../Pages/Notification/Notification";
import Order from "../../Pages/Order/Order";
import ProductDetail from "../../Pages/ProductDetail/ProductDetail";
import Setting from "../../Pages/Setting/Setting";
import WhishList from "../../Pages/WhishList/WhishList";
import Chat from "../../Pages/Chat/Chat";
import AdminChat from "../../Pages/Admininterface/AdminChat/AdminChat";
import UserPrivateRoute from "./UserPrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Home" element={<UserPrivateRoute element={<Home />} />} />
      <Route path="/Shop" element={<UserPrivateRoute element={<Shop />} />} />
      <Route
        path="/Profile"
        element={<UserPrivateRoute element={<Profile />} />}
      />
      <Route
        path="/Setting"
        element={<UserPrivateRoute element={<Setting />} />}
      />
      <Route
        path="/Notification"
        element={<UserPrivateRoute element={<Notification />} />}
      />
      <Route path="/Order" element={<UserPrivateRoute element={<Order />} />} />
      <Route
        path="WhishList"
        element={<UserPrivateRoute element={<WhishList />} />}
      />
      <Route
        path="/AdminDashboard"
        element={<AdminPrivateRoute element={<AdminDashboard />} />}
      />
      <Route
        path="/ManegeOrder"
        element={<AdminPrivateRoute element={<ManegeOrder />} />}
      />
      <Route
        path="/CreateOrder"
        element={<AdminPrivateRoute element={<CreateOrder />} />}
      />
      <Route
        path="/AdminProfile"
        element={<AdminPrivateRoute element={<Adminprofile />} />}
      />
      <Route
        path="/ProductDetail/:id"
        element={<UserPrivateRoute element={<ProductDetail />} />}
      />
      <Route path="/Cart" element={<UserPrivateRoute element={<Cart />} />} />
      <Route
        path="/WhishList"
        element={<UserPrivateRoute element={<WhishList />} />}
      />
      <Route path="/Chat" element={<UserPrivateRoute element={<Chat />} />} />
      <Route
        path="/AdminChat"
        element={<AdminPrivateRoute element={<AdminChat />} />}
      />
    </Routes>
  );
};

export default AppRouter;
