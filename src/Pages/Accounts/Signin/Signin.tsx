import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../Components/Header/Header";
import useAuth from "../../../hooks/useAuth";
import "./../style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const AdminEmail = useSelector((state?: any) => state?.admin?.admin.email);
  console.log(AdminEmail);

  const { signin, successMessage, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [whereToNavigate, setWhereToNavigate] = useState<string>("/Home");

  const handleLogin = async () => {
    if (email === AdminEmail) {
      setWhereToNavigate("/AdminDashboard");
    }
    await signin({ email, password });
  };

  useEffect(() => {
    if (successMessage) {
      toast.success("Signin successful!");

      setTimeout(() => {
        navigate(whereToNavigate);
      }, 2000);
      return;
    }
    if (error) {
      toast.warning(error);
    }
  }, [successMessage, whereToNavigate, error]);
  return (
    <>
      <Header />
      <div className="sigupformcontainer">
        <div className="mx-auto text-center font-serif text-xl mb-2 pt-4 bold font-bold">
          <h1 style={{ fontSize: "25px" }}>Login</h1>
        </div>

        <div className="inputDiv">
          <TextField
            placeholder="Email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            placeholder="Password"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setpassword(e.target.value)}
          />

          <button
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
            onClick={handleLogin}
            className="login"
          >
            Login
          </button>
          <p>New to website ?</p>
          <button
            onClick={() => navigate("/")}
            className="regesterbtn"
            style={{
              width: "100%",
              height: "60px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "sans-serif",
              letterSpacing: ".1rem",
              border: "none",
            }}
          >
            Register
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signin;
