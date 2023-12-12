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
  const AdminEmail = useSelector(
    (state?: any) => state?.admin?.admin[0]?.email
  );
  console.log("hi==>", AdminEmail);

  const navigate = useNavigate();
  const { signin, successMessage } = useAuth();
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
    }
  }, [successMessage, whereToNavigate]);
  return (
    <>
      <Header />
      <div className="sigupformcontainer">
        <div className="mx-auto text-center font-serif text-xl mb-2 pt-4 bold font-bold">
          <h1>Login</h1>
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
          >
            Login
          </button>
          <p>New to website ?</p>
          <button
            onClick={() => navigate("/")}
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
