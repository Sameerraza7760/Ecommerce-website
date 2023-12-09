import { faClipboard, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Menu } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import useProduct from "./../../../hooks/useProduct";

import { Product } from "types/types";
import "./../style.css";

function AdminDashboard() {
  const product = useSelector((state?: any) => state?.product?.product);
  console.log(product);

  const { getProduct } = useProduct();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const { SubMenu } = Menu;
  {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      getProduct();
      console.log("hi broo==>", product);
    }, []);

    return (
      <>
        <Header />

        <div className="bg-blue-100 min-h-screen w-full flex">
          <div className="h-auto w-[16%]">
            <AppMenu />
          </div>

          <div className="w-[80%] h-full ">
            <div className="flex w-full justify-between p-5 h-[15%]">
              <div>
                <TextField
                  placeholder="Product Name"
                  id="outlined-basic-product"
                  label="Product Name"
                  variant="outlined"
                  autoComplete="off"
                  style={{ width: "100%", marginBottom: "10px" }}
                  focused
                  color="secondary"
                />
              </div>
              <div className="flex gap-4">
                <FontAwesomeIcon
                  className="Drawer text-xl "
                  icon={faCommentDots}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                  // Adjust the size as needed
                />
                <FontAwesomeIcon
                  className="Drawer text-xl "
                  icon={faClipboard}
                  style={{ fontSize: "2rem", cursor: "pointer" }} // Adjust the size as needed
                />
              </div>
            </div>

            <div>
              <div className="w-full pl-7 font-serif font-bold text-xl ">
                <h1>Product</h1>
              </div>

              <div className="flex flex-wrap justify-center mx-auto gap-3 w-full">
                {product.map((item: Product) => (
                  <Card
                    className="border rounded-md w-[300px]"
                    sx={{ maxWidth: 490, backgroundColor: "#1a202c" }}
                  >
                    <CardMedia
                      component="img"
                      alt="Product Image"
                      height="220"
                      src={
                        typeof item.imageUrl === "string" ? item.imageUrl : ""
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
                        {item.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-white font-serif"
                      >
                        {item.productDiscription}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="text-white font-serif"
                        fontSize="1rem"
                      >
                        {` $${item.productPrice}`}{" "}
                        {/* Replace with the actual price */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        style={{ backgroundColor: "#4CAF50", color: "#ffffff" }}
                      >
                        Update
                      </Button>
                      <Button
                        style={{ backgroundColor: "#FF5722", color: "#ffffff" }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AdminDashboard;
