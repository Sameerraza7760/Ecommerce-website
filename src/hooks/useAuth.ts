import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//  import { SnackbarProvider, enqueueSnackbar } from 'notistack'
//  import { useSnackbar } from 'notistack';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Iauth } from "../types/types";
import firebase from "./../Config/Firebase/firebase";
const useAuth = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const { SignupFirebase, signinFirebase } = firebase;
  const navigate = useNavigate();

  const signup = async (userinfo: Iauth) => {
    try {
      await SignupFirebase(userinfo);
      alert("regesterd");
      navigate("/Signin");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const signin = async (userinfo: Iauth) => {
    try {
      await signinFirebase(userinfo);
      //  await  enqueueSnackbar('Signup successful!', { variant: 'success' });
      alert("loggedin");
      navigate('/Home')
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return { signup, signin };
};

export default useAuth;
