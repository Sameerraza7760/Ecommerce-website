import { message } from "antd";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product, userOrder } from "types/types";
import { setProduct } from "../store/slice/productSlice";
import { auth, db, storage } from "./../Config/Firebase/firebase";

const useProduct = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ADD PRODUCT IN DATABASE
  const addProduct = async (newProductData: Product) => {
    const productId = auth.currentUser.uid + Date.now();
    try {
      const productDocRef = doc(db, "PRODUCT", productId);

      const productData = {
        ...newProductData,
        id: productId,
      };

      await setDoc(productDocRef, productData);
    } catch (error: any) {
      console.log(error);
    }
  };

  // UPLOAD IMAGES OF ARRAY IN STOREAGE AND GET LINK
  const uploadImage = async (images: File[] | null) => {
    const urls: string[] = [];
    if (!images) return;
    await Promise.all(
      images.map(async (item) => {
        const storageRef = ref(storage, `images/${item.name}`);
        const snapshot = await uploadBytes(storageRef, item);
        const url: string = await getDownloadURL(snapshot.ref);
        urls.push(url);
      })
    );

    return urls;
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
  type GetProductDetailFunction = (id: string) => Promise<Product>;

  //GET THE PRODUCT DETAIL
  const getProductDetail: GetProductDetailFunction = async (id: string) => {
    try {
      const userDocRef = doc(collection(db, "PRODUCT"), id);
      const querySnapshot = await getDoc(userDocRef);
      if (querySnapshot.exists()) {
        const ProductData = querySnapshot.data();
        console.log("User Data:", ProductData);
        return ProductData;
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  // ORDER PLACED IN DATABASE
  const orderPlaced = async (order: userOrder) => {
    try {
      const userId = auth.currentUser.uid + Date.now();
      const orderRef = doc(collection(db, "order"), userId);

      const orderData = {
        ...order,
        userId,
      };

      await setDoc(orderRef, orderData);
      message.success("Order placed successfully!");
    } catch (error: any) {
      console.error("Error placing order:", error);
      message.error(error.message);
    }
  };

  //GET ORDER FROM DATABASE
  const getOrder = async () => {
    try {
      const orderCollection = collection(db, "order");
      const querySnapshot = await getDocs(orderCollection);

      if (!querySnapshot.empty) {
        const orderArray = querySnapshot.docs.map(
          (doc: any) => doc.data() as userOrder
        );
        return orderArray;
      } else {
        return [];
      }
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  };
  //  CHANGE STATUS OF ORDER AFTER ADMMIN MANEGE
  interface Orderstatus {
    id: string | undefined;
    status: string | undefined;
  }
  const changeOrderStatus = async (statusData: Orderstatus) => {
    const { status, id } = statusData;

    console.log(status);

    try {
      if (!id) {
        throw new Error("Document ID is required.");
      }

      const orderDocRef = doc(collection(db, "order"), id);
      const updateData = {
        status,
      };

      await updateDoc(orderDocRef, updateData);
      message.success(status);
    } catch (error: any) {
      console.error("Error updating document:", error.message);
    }
  };

  //SUBMIT REWIEW IN DATABASE
  const submitRewiew = async (rewiewDetail: any) => {
    const { productId, newReview } = rewiewDetail;
    console.log(newReview, productId);
    try {
      const productDocRef = doc(collection(db, "PRODUCT"), productId);
      const updateData = {
        rewiew: arrayUnion(newReview),
      };
      await updateDoc(productDocRef, updateData);
      message.success("Rewiew Added");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  //DELETE PRODUCT IN DATABASE
  const deleteProduct = async (id: any) => {
    await deleteDoc(doc(db, "PRODUCT", id));
    message.info("Delete Item");
  };

  //UPLOAD PRODUCT IN DATABASE
  const updateProduct = async (item: any) => {
    // const {
    //   productPrice,
    //   productName,
    //   id,
    //   productDiscription,
    //   productQuantaty,
    // } = item;
    // try {
    //   const productDocref = doc(collection(db, "PRODUCT"), id);
    //   const updateData: Partial<Product> = {};
    //   if (productName !== undefined) {
    //     updateData.productName = productName;
    //   }
    //   if (productPrice !== undefined) {
    //     updateData.productPrice = productPrice;
    //   }
    //   if (productDiscription !== undefined) {
    //     updateData.productPrice = productPrice;
    //   }
    //   if (productQuantaty !== undefined) {
    //     updateData.productPrice = productPrice;
    //   }
    //   await updateDoc(productDocref, updateData);
    //   message.success(" Update Product successfully!");
    //   // console.log("User updated successfully");
    // } catch (error: any) {
    //   message.error(error.message);
    // }
  };
  return {
    addProduct,
    submitRewiew,
    getProduct,
    getProductDetail,
    orderPlaced,
    getOrder,
    changeOrderStatus,
    uploadImage,
    deleteProduct,
    updateProduct,
  };
};

export default useProduct;
