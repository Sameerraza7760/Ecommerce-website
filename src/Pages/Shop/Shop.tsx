import React from "react";
import { useSelector } from "react-redux";
import Header from "./../../Components/Header/Header";
import UserCard from "./../Card/UserCard";
import { useEffect, useState } from "react";
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

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts: Product[] =
    selectedCategory === "All"
      ? product
      : product.filter((item: Product) =>
          item.productName.toLowerCase().includes(selectedCategory)
        );

  console.log(product);
  const { getProduct } = useProduct();

  useEffect(() => {
    getProduct();
  }, []);
  const categories = ["shirt", "paint", "Tops", "Jackets", "Shoes"];
  const defaultCategory = categories[0];

  return (
    <>
      <Header />
      <div className="w-full">
        <div className="w-[60%] mx-auto text-center mt-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Explore Our Products
          </h1>
          <p className="text-gray-700 mb-8">
            Discover our latest collection inspired by the late '90s and early
            2000s styles. Comfortable, sustainable, and pantone-inspired
            colorways. Limited editions on ribbed items.
          </p>
        </div>

        <div className="flex w-[90%] p-4 mx-auto mb-8 justify-between">
          <div className="w-[300px]">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-blue-500"
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[80%] mx-auto">
          {filteredProducts.map((item: Product, index: number) => (
            <UserCard key={index} items={item} />
          ))}
        </div>

        <div className="fixed bottom-0 right-0 m-6">
          <h2
            onClick={() => navigate("/Cart")}
            className="text-2xl font-semibold items-end cursor-pointer text-blue-600"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          </h2>
        </div>
      </div>
    </>
  );
}

export default Shop;
