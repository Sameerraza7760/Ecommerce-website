import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import useProduct from "./../../../hooks/useProduct";
import useAuth from "./../../../hooks/useAuth";
import { Product } from "types/types";

function CreateOrder() {
  const { addProduct } = useProduct();
  const { uploadImage } = useAuth();
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productDiscription, setProductDiscription] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const [productQuantaty, setProductQuantaty] = useState<number | null>(null);
  const [imageurl, setImageurl] = useState<File | null>(null);
  const [email, setEmail] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    // Access the selected file from the input
    if (e && e.target && e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Do something with the selected file, for example, set it in state
      setImageurl(selectedFile);
    }
  };

  const product = async () => {
    let imageUrl: string | undefined = await uploadImage(imageurl);

    const productArray: Product = {
      productName,
      productPrice,
      productDiscription,
      productCategory,
      productQuantaty,
      imageUrl,
      email,
    };

    // for (let key in productArray) {
    //   const value = productArray[key as keyof Product];

    //   if (!value) {
    //     alert("Please Fill All Inputs");
    //     return;
    //   }
    // }
    addProduct(productArray);
  };
  const handlePrice = (e: any) => {
    const value = parseFloat(e.target.value);
    setProductPrice(isNaN(value) ? null : value);
  };
  const handleQuantity = (e: any) => {
    const value = parseFloat(e.target.value);
    setProductQuantaty(isNaN(value) ? null : value);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex bg-gradient-to-r from-blue-500 to-purple-500 ">
        <div className="h-auto w-[16%]">
          <AppMenu />
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 m-4 w-[60%] mx-auto h-auto ">
          <h2 className="text-3xl mb-6 text-center text-gray-800 font-semibold font-serif">
            Add Product
          </h2>
          <TextField
            placeholder="Product Name"
            id="outlined-basic-product"
            label="Product Name"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            focused
            color="secondary"
            onChange={(e) => setProductName(e.target.value)}
          />

          <TextField
            placeholder="Product Price"
            id="outlined-basic-price"
            label="Product Price"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="number"
            focused
            color="secondary"
            value={productPrice !== null ? productPrice.toString() : ""}
            onChange={handlePrice}

            // min="0"
            // step="0.01"
          />

          <TextField
            placeholder="Product Description"
            id="outlined-basic-description"
            label="Product Description"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            multiline
            rows={2}
            focused
            color="secondary"
            onChange={(e) => setProductDiscription(e.target.value)}
          />

          <TextField
            placeholder="Product Category"
            id="outlined-basic-category"
            label="Product Category"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            focused
            color="secondary"
            onChange={(e) => setProductCategory(e.target.value)}
          />

          <input
            placeholder="Product Image URL"
            typeof="file"
            id="outlined-basic-image"
            // label="Product Image URL"
            // variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="file"
            // focused
            color="secondary"
            onChange={handleImageChange}
            className="mb-3"
          />

          <TextField
            placeholder="Product Quantity"
            id="outlined-basic-quantity"
            label="Product Quantity"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="number"
            focused
            color="secondary"
            onChange={handleQuantity}
          />

          <TextField
            placeholder="Your Email"
            id="outlined-basic-email"
            label="Customer Email"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="email"
            focused
            color="secondary"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            onClick={product}
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
