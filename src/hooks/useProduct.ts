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

  const orderPlaced = async (order: userOrder) => {
    try {
      const orderRef = doc(
        collection(db, "order"),
        auth.currentUser.uid + Date.now()
      );
      await setDoc(orderRef, order);
      message.success("Order placed successfully!");
    } catch (error: any) {
      console.error("Error placing order:", error);
      message.error(error.message);
    }
  };

  return { addProduct, getProduct, getProductDetail, orderPlaced };
};

export default useProduct;
