import { faClipboard, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product } from "types/types";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import useAuth from "./../../../hooks/useAuth";
import useProduct from "./../../../hooks/useProduct";
import { setProduct } from "store/slice/productSlice";
import './style.css'
import DrawerMenu from "../Adminmenu/DrawerMenu";
import { MenuOutlined } from "@mui/icons-material";

function AdminDashboard() {
  const navigate = useNavigate();
  const product = useSelector((state?: any) => state?.product?.product);
  console.log(product);
  const { getProduct, deleteProduct, updateProduct } = useProduct();
  const { uploadImage } = useAuth();
  const [updateProductName, setUpdateProductName] = useState<string>("");
  const [filteredCategary, setFilteredCategary] = useState<string>(" ");
  const [updateProductQuantity, setUpdateQuantity] = useState<number | null>(
    null
  );
  const [updatePrice, setUpdatePrice] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [Delete, setDelete] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");

  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  const showModal = (id: string) => {
    setOpen(true);
    console.log(id);
    setItemId(id);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteItem = async (id: any) => {
    await deleteProduct(id);
    setDelete(true);
  };
  const updateItem = async () => {
    // console.log(id);

    if (!itemId) return;
    const productData: Partial<Product> = {
      productName: updateProductName !== "" ? updateProductName : undefined,
      productPrice: updatePrice !== null ? updatePrice : undefined,
      productQuantaty:
        updateProductQuantity !== null ? updateProductQuantity : undefined,
      id: itemId,
    };
    await updateProduct(productData);
    setUpdate(true);

    setItemId("");
  };
  useEffect(() => {
    const getProductFromDB = async () => {
      await getProduct();
      setDelete(false);
      setUpdate(false);
    };
    getProductFromDB();
  }, [update, Delete]);
  const filteredProducts: Product[] =
    filteredCategary === " "
      ? product
      : product.filter((item: Product) =>
          item.productName.toLowerCase().includes(filteredCategary)
        );

  return (
    <>
      <Header />

      <div className="dashboard-container bg-gray-100 min-h-screen w-full flex">
        <div className="menu h-auto w-[250px]">
          <AppMenu />
        </div>
       
        <div className="dashboard-content w-[74%] h-full p-5">
          <div className="flex justify-between items-center mb-5 ">
          <div className="ModalMenu hidden h-auto" >
          <button onClick={showDrawer}>{<MenuOutlined />}</button>
      <DrawerMenu visible={drawerVisible} onClose={closeDrawer}/>
        </div>
            <TextField
              placeholder="Search for Product"
              id="outlined-basic-product"
              label="Product Name"
              variant="outlined"
              autoComplete="off"
              style={{ width: "300px", backgroundColor: "#fff" }}
              focused
              color="secondary"
              onChange={(e) => setFilteredCategary(e.target.value)}
              className="textDashboeard"
            />
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="Drawer text-xl cursor-pointer block"
                icon={faCommentDots}
                onClick={() => navigate("/AdminChat")}
              />
              <FontAwesomeIcon
                className="Drawer text-xl cursor-pointer block"
                icon={faClipboard}
              />
            </div>
          </div>

          <div>
            <div className="headingPoroduct  w-full pl-7 font-serif font-bold text-2xl mb-3">
              <h1>Product Dashboard</h1>
            </div>

            <div className="productDisplayDashboead flex flex-wrap justify-center gap-4">
              {filteredProducts.map((item: Product) => (
                <Card
                  className="border rounded-md w-[300px] shadow-md transition duration-300 ease-in-out"
                  key={item.id}
                >
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    height="220"
                    src={
                      typeof item?.imageurl?.[0] === "string"
                        ? item.imageurl[0]
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
                      className="text-black font-serif"
                      fontSize="1rem"
                    >
                      {item.productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-black font-serif"
                    >
                      {item.productQuantaty}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="text-black font-serif"
                      fontSize="1rem"
                    >
                      {` $${item.productPrice}`}{" "}
                      {/* Replace with the actual price */}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{ backgroundColor: "#4CAF50", color: "#ffffff" }}
                      onClick={() => showModal(item.id as string)}
                    >
                      Update
                    </Button>

                    <Modal
                      open={open}
                      title="Title"
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={(_, { OkBtn, CancelBtn }) => (
                        <>
                          <CancelBtn />
                          <OkBtn />
                        </>
                      )}
                    >
                      <TextField
                        placeholder="Product Name"
                        id="updateProductName"
                        label="Name"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused
                        onChange={(e) => setUpdateProductName(e.target.value)}
                        value={updateProductName}
                      />
                      <TextField
                        placeholder="Product Price"
                        type="number"
                        id="updateProductPrice"
                        label="Product Price"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused
                        onChange={(e) =>
                          setUpdatePrice(parseFloat(e.target.value))
                        }
                        value={updatePrice}
                      />

                      <TextField
                        placeholder="Product Quantity"
                        type="number"
                        id="updateProductQuantity"
                        label="Product Quantity "
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused
                        value={updateProductQuantity}
                        onChange={(e) =>
                          setUpdateQuantity(e.target.value as any)
                        }
                      />

                      <button
                        className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={updateItem}
                      >
                        Update Product
                      </button>
                    </Modal>

                    <Button
                      style={{ backgroundColor: "#FF5722", color: "#ffffff" }}
                      onClick={() => deleteItem(item.id)}
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

export default AdminDashboard;
