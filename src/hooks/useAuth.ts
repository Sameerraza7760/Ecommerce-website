import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../src/features/User/userSlice";
import { User } from "./../types/types";
//  import { SnackbarProvider, enqueueSnackbar } from 'notistack'
//  import { useSnackbar } from 'notistack';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Iauth } from "../types/types";
import firebase from "./../Config/Firebase/firebase";
const useAuth = () => {
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const { SignupFirebase, signinFirebase, auth } = firebase;
  const navigate = useNavigate();

  const signup = async (userinfo: Iauth) => {
    try {
      const userCredential = await SignupFirebase(userinfo);
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
      navigate("/Home");
    } catch (e: any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userObject: User = {
          email: user.email,
          id: user.uid,
        };
        dispatch(setUser(userObject));
      } else {
        // Handle the case when the user is not logged in
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, [auth, dispatch]);
  async function logout() {
    await auth.signOut();

    alert("logout Sussesfully");

    navigate("/");
  }

  return { signup, signin, logout };
};

export default useAuth;
