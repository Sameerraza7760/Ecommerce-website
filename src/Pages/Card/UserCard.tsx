import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "./../../features/Cart/CartSlice";
import { CartItem } from "types/types";
import { Product } from "types/types";
import { notification } from "antd";

interface ProductProps {
  items: Product;
}
function UserCard({ items }: ProductProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state?: any) => state?.user?.user?.id);
  const addToCart = (items: CartItem) => {
    notification.success({
      message: "Item Added to Cart",
      description: `${items.productName} has been added to your cart.`,
      placement: "topRight",
    });

    const cartObject: CartItem = { ...items, userId };
    dispatch(setCartItem(cartObject));
    console.log(cartObject);
  };
  return (
    <div
      key={items.id}
      className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer "
    >
      {" "}
      <img
        style={{
          objectFit: "cover",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        id="Cardimg"
        src={
          typeof items?.imageUrl?.[0] === "string"
            ? items.imageUrl[0]
            : undefined
        }
        // alt={`Product ${index + 1}`}
        className="w-full h-48 object-cover"
        onClick={() => navigate(`/ProductDetail/${items.id || ""}`)}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {items.productName}
        </h2>
        <p className="text-gray-600">{items.productDiscription}</p>
        <p className="text-blue-500 font-bold mt-2">${items.productPrice}</p>
      </div>
      <div className="flex justify-end p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={() => addToCart(items as CartItem)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default UserCard;

