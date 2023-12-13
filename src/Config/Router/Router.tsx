// Router.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "../../Pages/Account/Account";
import Signin from "../../Pages/Accounts/Signin/Signin";
import Signup from "../../Pages/Accounts/Signup/Signup";
import Home from "../../Pages/Home/Home";
import Profile from "../../Pages/Profile/Profile";
import Shop from "../../Pages/Shop/Shop";
import AdminDashboard from "./../../Pages/Admininterface/AdminDashboard/AdminDashboard";
import Adminprofile from "./../../Pages/Admininterface/Adminprofile/Adminprofile";
import CreateOrder from "./../../Pages/Admininterface/CreateOrder/CreateOrder";
import ManegeOrder from "./../../Pages/Admininterface/MenegeOrder/ManegeOrder";
import Cart from "./../../Pages/Cart/Cart";
import Notification from "./../../Pages/Notification/Notification";
import Order from "./../../Pages/Order/Order";
import ProductDetail from "./../../Pages/ProductDetail/ProductDetail";
import Setting from "./../../Pages/Setting/Setting";
import WhishList from "./../../Pages/WhishList/WhishList";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Account" element={<Account />}></Route>
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
      <Route path="/ProductDetail/:id" element={<ProductDetail />} />
      <Route path="/Cart" element={<Cart />}></Route>
      <Route path="/WhishList" element={<WhishList />} />
    </Routes>
  );
};

export default AppRouter;
