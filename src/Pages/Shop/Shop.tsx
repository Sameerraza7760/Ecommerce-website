import React from "react";
import { useSelector } from "react-redux";
import Header from "./../../Components/Header/Header";
import UserCard from "./../Card/UserCard";
import { useEffect } from "react";
import useProduct from "./../../hooks/useProduct";
import { Product } from "types/types";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Shop() {
  const navigate = useNavigate();
  const product: Product[] = useSelector(
    (state?: any) => state?.product?.product
  );
  console.log(product);
  const { getProduct } = useProduct();

  useEffect(() => {
    getProduct();
  }, []);
  const categories = ["Shirts", "Paints", "Tops", "Jackets", "Shoes"];
  const defaultCategory = categories[0];

  return (
    <>
      <Header />
      <div className="w-full">
        <div className="w-[60%] mx-auto text-center mt-6">
          <h1 className="font-sens text-xl font-bold">PRODUCTS</h1>

          <div className="flex justify-between">
            <p className="w-full mx-auto font-serif">
              Inspired by the late '90s and early-to-mid 2000s clothing styles.
              Comfortable, sustainable + pantone Inspired colorways. No
              re-stocks on Ribbed Items once sold out.
            </p>

            <h2  onClick={()=>navigate('/Cart')} className="text-2xl font-semibold mb-4 items-end cursor-pointer text-blue-600 h-5">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            </h2>
          </div>
        </div>
        <div className="flex w-[90%] p-4 ml-6 justify-between ">
          <div className="w-[300px]">
            <TextField
              placeholder="Product Name"
              id="outlined-basic-product"
              label="Product Name"
              variant="outlined"
              autoComplete="off"
              style={{ width: "100%", marginBottom: "10px" }}
              focused
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="categorySelect"
            >
              Select Category:
            </label>
            <select
              id="categorySelect"
              className="border p-2 rounded-md w-full"
              defaultValue={defaultCategory}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-[80%] mx-auto mt-9 h-auto">
          <div className="w-full flex justify-center flex-wrap gap-3">
            {product.map((item: any, index: number) => (
              <UserCard key={index} items={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
