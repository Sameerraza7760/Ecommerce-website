import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faClipboard } from "@fortawesome/free-solid-svg-icons";

import { Menu } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import React, { useState } from "react";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";

import "./../style.css";

function AdminDashboard() {
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
                  placeholder="Enter a Product"
                  id="outlined-password-input"
                  type="text"
                  autoComplete="off"
                  style={{
                    width: "100%",
                    marginBottom: "27px",
                    padding: "10px",
                    fontSize: "12px",
                  }}
                />
              </div>
              <div className="flex gap-4">
                <FontAwesomeIcon
                  className="Drawer text-xl "
                  icon={faCommentDots}
                  style={{ fontSize: "2rem", cursor: "pointer" }} // Adjust the size as needed
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
                <Card className="border  border-gray-100 cursor-pointer rounded-md" sx={{ maxWidth: 290 }}>
                  <CardMedia
                    component="img"
                    alt="Green Iguana"
                    height="200"
                    src="" // Replace with the actual image URL
                    id="Cardimg"
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent className="cardBody">
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className="updatebtn bg-slate-500">Update</Button>
                    <Button className="deletebtn  bg-rose-700">Delete</Button>
                  </CardActions>
                </Card>
                <Card className="border  border-gray-100 cursor-pointer rounded-md" sx={{ maxWidth: 290 }}>
                  <CardMedia
                    component="img"
                    alt="Green Iguana"
                    height="200"
                    src="" // Replace with the actual image URL
                    id="Cardimg"
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent className="cardBody">
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className="updatebtn bg-slate-500">Update</Button>
                    <Button className="deletebtn  bg-rose-700">Delete</Button>
                  </CardActions>
                </Card>
                <Card className="border  border-gray-100 cursor-pointer rounded-md" sx={{ maxWidth: 290 }}>
                  <CardMedia
                    component="img"
                    alt="Green Iguana"
                    height="200"
                    src="" // Replace with the actual image URL
                    id="Cardimg"
                    style={{ objectFit: "cover" }}
                  />
                  <CardContent className="cardBody">
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button className="updatebtn bg-slate-500">Update</Button>
                    <Button className="deletebtn  bg-rose-700">Delete</Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default AdminDashboard;
