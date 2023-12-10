// Router.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../../Pages/Accounts/Signup/Signup";
import Signin from "../../Pages/Accounts/Signin/Signin";
import Home from "../../Pages/Home/Home";
import Shop from "../../Pages/Shop/Shop";
import Profile from "../../Pages/Profile/Profile";
import Account from "../../Pages/Account/Account";
import Blog from "./../../Pages/Blog/Blog";
import Setting from "./../../Pages/Setting/Setting";
import Notification from "./../../Pages/Notification/Notification";
import Order from "./../../Pages/Order/Order";
import WhishList from "./../../Pages/WhishList/WhishList";
import AdminDashboard from "./../../Pages/Admininterface/AdminDashboard/AdminDashboard";
import ManegeOrder from "./../../Pages/Admininterface/MenegeOrder/ManegeOrder";
import CreateOrder from "./../../Pages/Admininterface/CreateOrder/CreateOrder";
import Adminprofile from "./../../Pages/Admininterface/Adminprofile/Adminprofile";
import ProductDetail from "./../../Pages/ProductDetail/ProductDetail";
import Cart from "./../../Pages/Cart/Cart";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Account" element={<Account />}></Route>
      <Route path="/Blog" element={<Blog />}></Route>
      <Route path="/Setting" element={<Setting />}></Route>
      <Route path="/Notification" element={<Notification />}></Route>
      <Route path="/Order" element={<Order />}></Route>
      <Route path="WhishList" element={<WhishList />}></Route>
      <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
      <Route path="/ManegeOrder" element={<ManegeOrder />}></Route>
      <Route path="/CreateOrder" element={<CreateOrder />}></Route>
      <Route path="/AdminProfile" element={<Adminprofile />}>
        {" "}
      </Route>
      <Route path="/ProductDetail" element={<ProductDetail />}></Route>
      <Route path="/Cart" element={<Cart />}></Route>
    </Routes>
  );
};

export default AppRouter;
