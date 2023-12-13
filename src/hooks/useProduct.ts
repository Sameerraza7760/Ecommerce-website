import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product, userOrder } from "types/types";
import firebase from "../Config/Firebase/firebase"; // Adjust the import path as needed
import { setProduct } from "./../features/Products/productSlice";

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

  const uploadImage = async (images: File[] | null) => {
    const urls: string[] = [];
    if (images) {
      await Promise.all(images.map(async (item) => {
        const storageRef = ref(storage, `images/${item.name}`);
        const snapshot = await uploadBytes(storageRef, item);
        const url: string = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }));

      return urls;
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
      // Validate that id is not undefined or null
      //WRbutFm8KkhR9AbrPU30pOfQpKw21702375240804
      if (!id) {
        throw new Error("Document ID is required.");
      }

      const orderDocRef = doc(collection(db, "order"), id);
      const updateData = {
        status,
      };

      await updateDoc(orderDocRef, updateData);
      console.log("Document updated successfully.");
    } catch (error: any) {
      console.error("Error updating document:", error.message);
    }
  };
  return {
    addProduct,
    getProduct,
    getProductDetail,
    orderPlaced,
    getOrder,
    changeOrderStatus,
    uploadImage,
  };
};

export default useProduct;
