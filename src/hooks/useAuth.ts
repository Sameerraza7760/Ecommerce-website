import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../store/slice/userSlice";
import { Iauth, UserProfile } from "../types/types";
import { setAdmin } from "../store/slice/adminSlice";
import { Adminauth, User } from "./../types/types";
import { auth } from "./../Config/Firebase/firebase";
import { db } from "./../Config/Firebase/firebase";
import { storage } from "./../Config/Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
const useAuth = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //SIGNUP USER
  const signup = async (userinfo: Iauth) => {
    const { email, password } = userinfo;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addUserToDB(userinfo, userCredential.user.uid);
      setSuccessMessage("Registered successfully");
      return userCredential;
    } catch (e: any) {
      setError(e.message);
    }
  };

  //ADD USER IN DATABASE
  const addUserToDB = async (userProfile: Iauth, uid: string) => {
    let { email, username } = userProfile;
    let userData = { email, username, uid };
    return setDoc(doc(db, "users", uid), userData);
  };
  //SIGININ THE USER
  const signin = async (userinfo: Iauth) => {
    try {
      const { email, password } = userinfo;
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Loggedin");
    } catch (e: any) {
      setError(e.message);
    }
  };

  //BY DEFUALT PROFILE OF CURRENT USER
  const getUser = async (id: string) => {
    try {
      const userDocRef = doc(collection(db, "users"), id);
      const querySnapshot = await getDoc(userDocRef);

      if (querySnapshot.exists()) {
        const userData = querySnapshot.data();
        console.log("User Data:", userData);

        const userProfile: UserProfile = {
          userName: userData.username,
          email: userData.email,
          photurl: userData.image,
        };

        return userProfile;
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  };

  //UPDATE THE PROFILE OF CURRENT USER
  const updateUserName = async (userInfo: UserProfile) => {
    const { id, userName, photurl } = userInfo;

    try {
      const userDocRef = doc(collection(db, "users"), id);

      const updateData: any = {};

      if (userName !== undefined) {
        updateData.username = userName;
      }

      if (photurl !== undefined) {
        updateData.image = photurl;
      }

      await updateDoc(userDocRef, updateData);
      message.success("Profile Update successfully!");

      // console.log("User updated successfully");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  //SEND THE CURRUENT USER IN REDUX
  const sendUserInRedux = () => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        const userObject: User = {
          email: user.email,
          id: user.uid,
        };
        dispatch(setUser(userObject));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  };
  sendUserInRedux();

  //UPLOAD IMAGE AND TAKE URL
  const uploadImage = async (image: File | null) => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url: string = await getDownloadURL(snapshot.ref);
      return url;
    }
  };

  //LOGOUT THE CURRUENT USER
  async function logout() {
    await auth.signOut();
    navigate("/");
  }

  //GET ADMIN PROFILE
  const getAdmin = async () => {
    const querySnapshot = await getDocs(collection(db, "Admin"));

    let adminData;
    querySnapshot.forEach((doc: any) => {
      const { id, ...data } = doc.data() as Adminauth;
      adminData = { id: doc.id, ...data };
    });

    console.log("hi", adminData);

    if (adminData) {
      dispatch(setAdmin(adminData));
    }
  };

  
  //UPDATE THE ADMIN PROFILE
  const updateAdminProfile = async (userInfo: UserProfile) => {
    const { id, userName, photurl, phonenumber } = userInfo;
    try {
      const userDocRef = doc(collection(db, "Admin"), id);
      const updateData: any = {};
      if (userName !== undefined) {
        updateData.username = userName;
      }

      if (phonenumber !== undefined) {
        updateData.phonenumber = phonenumber;
      }

      if (photurl !== undefined) {
        updateData.image = photurl;
      }

      await updateDoc(userDocRef, updateData);
      message.success("Profile Update successfully!");

      console.log("User updated successfully");
    } catch (error: any) {
      console.error("Error updating user:", error);
      message.error(error.message);
    }
  };
  return {
    signup,
    signin,
    logout,
    successMessage,
    getUser,
    updateUserName,
    uploadImage,
    updateAdminProfile,
    getAdmin,
    error,
  };
};

export default useAuth;
