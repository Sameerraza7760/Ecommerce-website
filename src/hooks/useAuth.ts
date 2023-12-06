import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../src/features/User/userSlice";
import { Iauth, UserProfile } from "../types/types";
import firebase from "./../Config/Firebase/firebase";
import { User } from "./../types/types";
const useAuth = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const {
    SignupFirebase,
    signinFirebase,
    auth,
    getDoc,
    collection,
    db,
    doc,
    updateDoc,
    getDownloadURL,
    ref,
    uploadBytes,
    storage,
  } = firebase;
  const navigate = useNavigate();
//SIGNUP THE USER 
  const signup = async (userinfo: Iauth) => {
    try {
      const userCredential = await SignupFirebase(userinfo);
      setSuccessMessage("Registered successfully");
    } catch (e: any) {
      console.log(e.message);
    }
  };

  //SIGININ THE USER
  const signin = async (userinfo: Iauth) => {
    try {
      await signinFirebase(userinfo);

      setSuccessMessage("Loggedin");
    } catch (e: any) {
      console.log(e.message);
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
  const ubdateUserName = async (userInfo: UserProfile) => {
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

      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //SEND THE CURRUENT USER IN REDUX
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
  }, [auth, dispatch]);


  //UPLOAD IMAGE AND TAKE URL
  const uploadImage = async (image: File | null) => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    }
  };

  //LOGOUT THE CURRUENT USER
  async function logout() {
    await auth.signOut();
    navigate("/");
  }

  return {
    signup,
    signin,
    logout,
    successMessage,
    getUser,
    ubdateUserName,
    uploadImage,
  };
};

export default useAuth;
