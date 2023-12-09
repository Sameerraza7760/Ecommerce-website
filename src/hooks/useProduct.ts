import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/Firebase/firebase"; // Adjust the import path as needed
import { setProduct } from "./../features/Products/productSlice";
import { Button, message, Space } from 'antd';
import { useEffect } from "react";

import { Product } from "types/types";

const useProduct = () => {
  const [messageApi, contextHolder] = message.useMessage();

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

  
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Product added successfully!',
    });
  };

  const addProduct = async (productData: Product) => {
    try {
      await setDoc(
        doc(db, "PRODUCT", auth.currentUser.uid + Date.now()),
        productData
      );
    

      //   navigate("/success");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    success();
  }, [addProduct]);
  const getProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "PRODUCT"));
      const productArray: Product[] = [];
      querySnapshot.forEach((doc: any) => {
        productArray.push({ id: doc.id, ...doc.data() });
      });

      dispatch(setProduct(productArray));
    } catch (e) {
      console.error("Error fetching Products:", e);
    }
  };

  // Additional functions or state management related to products can be added here

  return { addProduct, getProduct };
};

export default useProduct;
