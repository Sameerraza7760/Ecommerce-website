import React from "react";

import Signup from "./Pages/Accounts/Signup/Signup";
import { Routes, Route } from "react-router-dom";
import Signin from "./Pages/Accounts/Signin/Signin";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
