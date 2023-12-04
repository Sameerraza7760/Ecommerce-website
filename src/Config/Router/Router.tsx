// Router.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../../Pages/Accounts/Signup/Signup";
import Signin from "../../Pages/Accounts/Signin/Signin";
import Home from "../../Pages/Home/Home";
import Shop from "../../Pages/Shop/Shop";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Shop" element={<Shop />} />
    </Routes>
  );
};

export default AppRouter;
