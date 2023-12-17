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
import { faClipboard, faCommentDots } from "@fortawesome/free-solid-svg-icons";

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
        <div className="w-full md:w-3/5 lg:w-2/3 xl:w-1/2 mx-auto text-center mt-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
            Explore Our Products
          </h1>
          <p className="text-gray-700 mb-8">
            Discover our latest collection inspired by the late '90s and early
            2000s styles. Comfortable, sustainable, and pantone-inspired
            colorways. Limited editions on ribbed items.
          </p>
        </div>

        <div className="flex flex-col md:flex-row w-[90%] md:w-90% p-4 mx-auto mb-8 justify-between">
          <div className="w-full md:w-2/5 mb-4 md:mb-0 md:mr-4">
            <input
              type="text"
              placeholder="Search Product"
              className="w-full p-2 border-b-2 border-gray-300 outline-none focus:border-blue-500"
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </div>
          <div className="w-full md:w-2/5">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 w-[87%] md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((item: Product, index: number) => (
            <UserCard key={index} items={item} />
          ))}
        </div>

        <div className="fixed bottom-0 right-0 m-6 flex gap-3">
          <h2
            onClick={() => navigate("/Cart")}
            className="text-xl md:text-2xl font-semibold items-end cursor-pointer text-blue-600"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
        
          </h2>
       <h2>
       <FontAwesomeIcon
              className="text-xl md:text-2xl font-semibold items-end cursor-pointer text-blue-600 "
              icon={faCommentDots}
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={() => navigate("/Chat")}
              // Adjust the size as needed
            />
       </h2>
        </div>
      </div>
    </>
  );
}

export default Shop;
