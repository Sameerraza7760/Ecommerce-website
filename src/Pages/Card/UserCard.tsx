import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Product } from "types/types";
interface ProductProps {
  items: Product;
}
function UserCard({ items }: ProductProps) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-wrap justify-center mx-auto gap-3 w-full">
        <Card
          className="border rounded-md w-[300px]"
          sx={{ maxWidth: 490, backgroundColor: "#1a202c" }}
        >
          <CardMedia
            onClick={() => navigate("/ProductDetail")}
            component="img"
            alt="Product Image"
            height="220"
            src={typeof items.imageUrl === "string" ? items.imageUrl : ""}
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
