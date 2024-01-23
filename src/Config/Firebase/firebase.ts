import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
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


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


// console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
