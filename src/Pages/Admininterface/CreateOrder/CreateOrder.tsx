import TextField from "@mui/material/TextField";
import { Typography } from "antd";
import React from "react";
import AppMenu from "../Adminmenu/Menu";
// import 'antd/dist/antd.css'; // Import Ant Design styles

const { Title } = Typography;

function CreateOrder() {
  return (
    <>
      <div className="min-h-screen w-full flex bg-gradient-to-r from-blue-500 to-purple-500 ">
        <div className="h-auto w-[16%]">
          <AppMenu />
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 m-4 w-[80%] mx-auto h-auto ">
          <h2 className="text-3xl mb-6 text-center text-gray-800 font-semibold">
            Add Product
          </h2>
          <TextField
            placeholder="Product Name"
            id="outlined-basic-product"
            label="Product Name"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <TextField
            placeholder="Product Price"
            id="outlined-basic-price"
            label="Product Price"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="number"
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
            rows={4}
          />

          <TextField
            placeholder="Product Category"
            id="outlined-basic-category"
            label="Product Category"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <TextField
            placeholder="Product Image URL"
            id="outlined-basic-image"
            label="Product Image URL"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="url"
          />

          <TextField
            placeholder="Product Quantity"
            id="outlined-basic-quantity"
            label="Product Quantity"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="number"
            // min="1"/
          />

          <TextField
            placeholder="Customer Email"
            id="outlined-basic-email"
            label="Customer Email"
            variant="outlined"
            autoComplete="off"
            style={{ width: "100%", marginBottom: "10px" }}
            type="email"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
