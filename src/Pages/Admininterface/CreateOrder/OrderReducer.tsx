import { Product } from "types/types";

const initialState: Product = {
  productName: "",
  productPrice: 0,
  productDiscription: "",
  productCategory: "",
  productQuantaty: 0,
  email: "",
  imageurl: [],
};

const reducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case "productName":
      return { ...state, productName: payload };
    case "productPrice":
      return { ...state, productPrice: payload };
    case "productDiscription":
      return { ...state, productDiscription: payload };
    case "productCategory":
      return { ...state, productCategory: payload };
    case "productQuantaty":
      return { ...state, productQuantaty: payload };

    case "email":
      return { ...state, email: payload };
    case "ADD_IMAGES":
      return { ...state, imageurl: [...state.imageurl, ...payload] };
    case "RESET_FORM":
      return {
        ...state,
        productName: "",
        productPrice: 0,
        productDiscription: "",
        email: "",
        productQuantaty: 0,
        productCategory: "",
        imageurl: [],
      };
    default:
      return state;
  }
};

export { initialState, reducer };
