import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import { User, messegeData } from "types/types";
import { db } from "./../Config/Firebase/firebase";
const useChat = () => {

  //SEND MESSEGES
  const sendMessegeToDb = async (messageData: messegeData) => {
    const { senderId, receiverId } = messageData;
    const chatId = [receiverId, senderId].sort().join("-");
    const messagesRef = doc(db, "messages", chatId);
    try {
      await setDoc(messagesRef, messageData, { merge: true });
      console.log("Message sent successfully!");
    } catch (error: any) {
      console.error("Error sending message:", error.message);
    }
  };

  //  GET MESSEGES FROM DB
  const getMessagesFromDb = (
    adminId: string,
    userId: string,
    callback: (messages: messegeData[]) => void
  ) => {
    const messagesCollection = collection(db, "messages");
    const chatId = [adminId, userId].sort().join("-");

    const q = query(
      messagesCollection,
      where(`chatRoomId.${userId}`, "==", true),
      where(`chatRoomId.${adminId}`, "==", true)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const messages: messegeData[] = [];

        querySnapshot.forEach((doc) => {
          const messageData = doc.data() as messegeData;
          messages.push(messageData);
        });
        callback(messages);
      },
      (error) => {
        console.error("Error getting messages:", error);
      }
    );

    return unsubscribe;
  };

  //GET USERS FROM DB AND DISPLAY IN SLIDEBAR
  const getUserFromDb = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userArray: User[] = [];
    querySnapshot.forEach((doc: any) => {
      const { id, ...data } = doc.data() as User;
      userArray.push({ id: doc.id, ...data });
    });
    return userArray;
  };

  return {
    sendMessegeToDb,
    getMessagesFromDb,
    getUserFromDb,
  };
};

export default useChat;
