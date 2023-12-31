import { MenuOutlined } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { message, notification } from "antd";
import React, { useReducer, useState } from "react";
import { Product } from "types/types";
import DrawerMenu from "../Adminmenu/DrawerMenu";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import useProduct from "./../../../hooks/useProduct";
import { reducer, initialState } from "./OrderReducer";
import "./style.css";

function CreateOrder() {
  const { addProduct, uploadImage } = useProduct();
  const [form, dispatch] = useReducer(reducer, initialState);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      console.log("Selected Files:", selectedFiles);
      dispatch({
        type: "ADD_IMAGES",
        payload: selectedFiles,
      });
    }
  };
  const product = async () => {
    let imageurl = await uploadImage(form.imageurl);

    const productArray: Product = {
      productName: form.productName,
      productPrice: form.productPrice,
      productDiscription: form.productDiscription,
      productCategory: form.productCategory,
      productQuantaty: form.productQuantaty,
      imageurl,
      email: form.email,
    };

    for (let key in productArray) {
      if (!productArray[key as keyof Product]) {
        message.warning("Please Fill All Inputs");
        return;
      }
    }
    try {
      await addProduct(productArray);
      notification.success({
        message: `${form.productName} Added In Your Store.`,
        description: `${form.productName} Added In Your Store.`,
        placement: "topRight",
      });

      dispatch({ type: "RESET_FORM" });
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    if (!isNaN(value)) {
      dispatch({ type: "productPrice", payload: value });
    }
  };
  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      dispatch({ type: "productQuantaty", payload: value });
    }
  };
  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="min-h-screen w-[100%] flex">
          <div className="menu h-auto w-[200px]">
            <AppMenu />
          </div>

          <div className="orderForm bg-white shadow-md rounded-lg p-8 m-4 sm:w-[70%] md:w-[70%] lg:w-[60%] mx-auto h-auto">
            <div className="ModalMenu hidden h-auto">
              <button onClick={showDrawer}>{<MenuOutlined />}</button>
              <DrawerMenu visible={drawerVisible} onClose={closeDrawer} />
            </div>
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
              value={form.productName}
              focused
              color="secondary"
              onChange={(e) =>
                dispatch({ type: "productName", payload: e.target.value })
              }
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
              value={
                form.productPrice !== null ? form.productPrice.toString() : ""
              }
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
              value={form.productDiscription}
              multiline
              rows={2}
              focused
              color="secondary"
              onChange={(e) =>
                dispatch({
                  type: "productDiscription",
                  payload: e.target.value,
                })
              }
            />

            <TextField
              placeholder="Product Category"
              id="outlined-basic-category"
              label="Product Category"
              variant="outlined"
              autoComplete="off"
              style={{ width: "100%", marginBottom: "10px" }}
              value={form.productCategory}
              focused
              color="secondary"
              onChange={(e) =>
                dispatch({ type: "productCategory", payload: e.target.value })
              }
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Images (up to 4 images)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

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
              value={
                form.productQuantaty !== null
                  ? form.productQuantaty.toString()
                  : ""
              }
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
              value={form.email}
              color="secondary"
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              onClick={product}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
