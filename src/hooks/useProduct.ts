import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/Firebase/firebase"; // Adjust the import path as needed
import { setProduct } from "./../features/Products/productSlice";

import { Product } from "types/types";

const useProduct = () => {
  const dispatch = useDispatch();
  const {
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
    getDocs,
    setDoc,
  } = firebase;
  const navigate = useNavigate();


  // ADD PRODUCT IN DATABASE
  const addProduct = async (productData: Product) => {
    try {
      await setDoc(
        doc(db, "PRODUCT", auth.currentUser.uid + Date.now()),
        productData
      );
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  //GET PRODUCT IN DATABASE
  const getProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "PRODUCT"));
      const productArray: Product[] = [];
      querySnapshot.forEach((doc: any) => {
        productArray.push({ id: doc.id, ...doc.data() });
      });
      //SEND THE DATA IN REDUX
      dispatch(setProduct(productArray));
    } catch (e) {
      console.error("Error fetching Products:", e);
    }
  };


  return { addProduct, getProduct };
};

export default useProduct;
