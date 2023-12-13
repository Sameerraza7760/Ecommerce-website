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
    <div>
      <div className="flex flex-wrap justify-center mx-auto gap-3 w-full">
        <Card
          className="border rounded-md w-[300px]"
          sx={{ maxWidth: 490, backgroundColor: "#1a202c" }}
        >
          <CardMedia
            onClick={() => navigate(`/ProductDetail/${items.id || ""}`)}
            component="img"
            alt="Product Image"
            height="220"
            src={
              typeof items?.imageUrl?.[0] === "string"
                ? items.imageUrl[0]
                : undefined
            }
            id="Cardimg"
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
          />
          <CardContent className="cardBody">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-white font-serif"
              fontSize="1rem"
            >
              {items.productName}
            </Typography>
            <Typography variant="body2" className="text-white font-serif">
              {items.productDiscription}
            </Typography>
            <Typography
              variant="h6"
              className="text-white font-serif"
              fontSize="1rem"
            >
              {` $${items.productPrice}`} {/* Replace with the actual price */}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              onClick={() => addToCart(items as CartItem)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default UserCard;
