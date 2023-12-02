import React, { useState } from "react";
import './../style.css'

import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom'
import Header  from '../../../Components/Header/Header'
import useAuth from "../../../hooks/useAuth";

  const Signin : React.FC=()=> {
    const navigate=useNavigate()
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async () => {
   
    await signin({ email, password });
  };

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
          onClick={()=>navigate('/')}
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
      </div>
    </>
  );
}


export default Signin