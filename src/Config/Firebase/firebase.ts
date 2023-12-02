import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { Iauth } from "types/types";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Message } from "@mui/icons-material";

const firebaseConfig = {
  apiKey: "AIzaSyAKK4oiI5nqlMPij0sRTiDU4xdh9eEVR_c",
  authDomain: "ecommerce-ca895.firebaseapp.com",
  projectId: "ecommerce-ca895",
  storageBucket: "ecommerce-ca895.appspot.com",
  messagingSenderId: "969444335677",
  appId: "1:969444335677:web:979d7937520761017e0a54",
  measurementId: "G-MFYPP36LFS",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

async function SignupFirebase(userInfo: Iauth) {
  const { email, password } = userInfo;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await addUserToDB(userInfo, userCredential.user.uid);
  } catch (error: any) {
    console.log(error.message);
  }
}

function signinFirebase(userInfo:Iauth) {
  const {email,password}=userInfo
  // const userData={email,password}
  return signInWithEmailAndPassword(auth, email,password);
}

const addUserToDB = async (userProfile: Iauth, uid: string) => {
  let { email, username } = userProfile;
  let userData = { email, username };
  return setDoc(doc(db, "users", uid), userData);
};

export default {
  createUserWithEmailAndPassword,
  SignupFirebase,
  signinFirebase
};
