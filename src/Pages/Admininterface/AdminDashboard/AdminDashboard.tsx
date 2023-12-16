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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Product } from "types/types";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import useAuth from "./../../../hooks/useAuth";
import useProduct from "./../../../hooks/useProduct";
import { useNavigate, useNavigation } from "react-router-dom";
import "./../style.css";
function AdminDashboard() {
  const navigate=useNavigate()
  const product = useSelector((state?: any) => state?.product?.product);
  console.log(product);
  const { getProduct, deleteProduct, updateProduct } = useProduct();
  const { uploadImage } = useAuth();
  const [updateProductName, setUpdateProductName] = useState<string>("");
  const [filteredCategary, setFilteredCategary] = useState<string>(" ");
  const [updateProductQuantity, setUpdateQuantity] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [open, setOpen] = useState(false);
  const [Delete, setDelete] = useState<boolean>(false);
  const [imageurl, setImageurl] = useState<File | null>();
  const [updateProductDescription, setUpdateProductDescription] =
    useState<string>("");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getProductFromDB = async () => {
      await getProduct();
      setDelete(false);
    };
    getProductFromDB();
  }, [Delete]);

  const deleteItem = async (id: any) => {
    await deleteProduct(id);
    setDelete(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImageurl(selectedFile);
      console.log(imageurl);
    }
  };

  const updateItem = async (id: string) => {
    const productData: Partial<Product> = {
      //   productName: updateProductName ?? undefined,
      //   productPrice: updatePrice ?? undefined,
      //   productQuantaty: updateProductQuantity ?? undefined,
      //   productDiscription: updateProductDescription ?? undefined,
      //   id: id,
      // };
      // await updateProduct(productData);
    };
  };

  const filteredProducts: Product[] =
    filteredCategary === " "
      ? product
      : product.filter((item: Product) =>
          item.productName.toLowerCase().includes(filteredCategary)
        );
  return (
    <>
      <Header />

      <div className="bg-blue-100 min-h-screen w-full flex">
        <div className="menu h-auto w-[250px]">
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
                onChange={(e) => setFilteredCategary(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <FontAwesomeIcon
                className="Drawer text-xl "
                icon={faCommentDots}
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={()=>navigate('/Chat')}
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
              {filteredProducts.map((item: Product) => (
                <Card
                  className="border rounded-md w-[300px]"
                  sx={{ maxWidth: 490, backgroundColor: "#1a202c" }}
                  key={item.id}
                >
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    height="220"
                    src={
                      typeof item?.imageUrl?.[0] === "string"
                        ? item.imageUrl[0]
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
                      onClick={showModal}
                    >
                      Update
                    </Button>
                    {/* //  HERE IS THE MODAL */}
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
                        id="outlined-basic-product"
                        label=" Name"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        onChange={(e) => setUpdateProductName(e.target.value)}
                        focused

                        // onChange={(e) => setName(e.target.value)}
                      />
                      <TextField
                        placeholder="Product Price"
                        type="number"
                        id="outlined-basic-product"
                        label="Product Name"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused
                        onChange={(e) => setUpdatePrice(e.target.value)}
                      />
                      <TextField
                        placeholder="Product Description"
                        type="number"
                        id="outlined-basic-product"
                        label="Product Name"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused
                        onChange={(e) =>
                          setUpdateProductDescription(e.target.value)
                        }
                      />
                      <TextField
                        placeholder="Product Categary"
                        type="number"
                        id="outlined-basic-product"
                        label="Product Name"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused

                        // onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <TextField
                        placeholder="Product Quantity"
                        type="number"
                        id="outlined-basic-product"
                        label="Product Name"
                        variant="outlined"
                        autoComplete="off"
                        style={{ width: "100%", marginBottom: "10px" }}
                        focused
                        onChange={(e) => setUpdateQuantity(e.target.value)}
                        // onChange={(e) => setPhoneNumber(e.target.value)}
                      />

                      <input type="file" onChange={handleImageChange} />
                      <button
                        className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={() => updateItem(item.id as string)}
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
