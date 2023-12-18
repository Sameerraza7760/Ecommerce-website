import { UserProfile } from "types/types";
import { db } from "./Config/Firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const getUserByUid = async (id: string) => {
  try {
    const userDocRef = doc(collection(db, "users"), id);
    const querySnapshot = await getDoc(userDocRef);
    return querySnapshot.data() || null;
  } catch (error) {
    console.error("Error getting user:", error);
  }
};
