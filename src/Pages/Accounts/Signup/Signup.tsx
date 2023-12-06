import React, { useState, useEffect } from "react";
import "./../style.css";
import TextField from "@mui/material/TextField";
import useAuth from "../../../hooks/useAuth";
import Header from "./../../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Siginup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, successMessage } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSignup = async () => {
    await signup({ email, password, username });
  };
  useEffect(() => {
    if (successMessage) {
      toast.success("Signup successful!");

      setTimeout(() => {
        navigate("/Signin");
      }, 2000);
    }
  }, [successMessage]);
  return (
    <>
      <Header />
      <div className="sigupformcontainer" style={{ height: "470px" }}>
        <div className="m-auto text-center font-serif font-bold text-3xl mb-4 pt-2">
          <h1>Signup</h1>
        </div>

        <div className="inputDiv">
          <TextField
            placeholder="Username"
            id="outlined-basic-username"
            label="Name"
            variant="outlined"
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <TextField
            placeholder="Email"
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
            type="email"
          />

          <TextField
            placeholder="Password"
            id="outlined-password-input"
            label="Password"
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "27px" }}
          />
          <button
            onClick={handleSignup}
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "sans-serif",
              letterSpacing: ".1rem",
              marginBottom: "4%",
            }}
          >
            Register
          </button>
          <button
            onClick={() => navigate("/Signin")}
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "grey",
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "sans-serif",
              letterSpacing: ".1rem",
              border: "none",
            }}
          >
            Login
          </button>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Siginup;