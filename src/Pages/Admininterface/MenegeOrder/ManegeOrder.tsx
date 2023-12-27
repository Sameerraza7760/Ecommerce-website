import {
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userOrder } from "types/types";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import useAuth from "./../../../hooks/useAuth";
import useProduct from "./../../../hooks/useProduct";
import "./style.css";
import DrawerMenu from "../Adminmenu/DrawerMenu";
import { MenuOutlined } from "@mui/icons-material";

function ManegeOrder() {
  const { logout } = useAuth();
  const { getOrder, changeOrderStatus } = useProduct();
  const [value, setValue] = React.useState("1");
  const [order, setOrder] = React.useState<userOrder[]>([]);

  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    try {
      toast.success("Logout successful!");
      setTimeout(() => logout(), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (id?: string, status?: string) => {
    await changeOrderStatus({ id, status });
  };
  useEffect(() => {
    const getUserOrder = async () => {
      const order = await getOrder();
      if (order) {
        setOrder(order);
      }
    };
    getUserOrder();
  }, [changeStatus]);

  return (
    <div>
      <Header />

      <div className="bg-slate-400 min-h-screen w-full flex">
        <div className="menu h-auto w-[200px]">
          <AppMenu />
        </div>
        <div style={{ display: "none" }} className="ModalMenu"></div>

        <div className="orderContainer w-[70%] p-5 mt-3 h-auto bg-slate-300 mx-auto rounded-md ">
          <div className="w-full h-auto flex justify-between">
            <div className="w-full font-serif font-bold cursor-pointer">
              <div className="ModalMenu hidden h-auto">
                <button onClick={showDrawer}>{<MenuOutlined />}</button>
                <DrawerMenu visible={drawerVisible} onClose={closeDrawer} />
              </div>
              <h1>Order</h1>{" "}
              <p>
                <span className="text-gray-400 text-xs ">
                  {order.length} order found
                </span>
              </p>{" "}
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
          <div>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="All Order" value="1" />
                    <Tab label="Order" value="2" />
                    <Tab label="Delevered" value="3" />
                    <Tab label="Cancel" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {order.length !== 0 &&
                    order.map((item, index) => (
                      <div
                        key={item.userId}
                        className="displayOrder w-full mx-auto rounded-md h-auto"
                      >
                        <div className="here w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md mb-5">
                          <div className="flex-none text-xl font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-grow text-lg">
                            {item.usershopping.length > 0
                              ? item.usershopping[0].productName
                              : ""}
                          </div>
                          <div className="flex-grow text-lg">
                            {item.address}
                          </div>
                          <div className="flex-grow text-lg">
                            {" "}
                            {new Date(Date.now()).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex-grow text-lg">
                            {item.usershopping[0].productPrice}
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faHourglassHalf}
                              className="text-yellow-500 mr-2"
                            />

                            <span className=" text-yellow-500 font-semibold cursor-pointer">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </TabPanel>
                <TabPanel value="2">
                  {order.length !== 0 &&
                    order.map((item, index) =>
                      item.status === "Pending" ? (
                        <div
                          key={item.userId}
                          className="displayOrder w-full mx-auto rounded-md h-auto"
                        >
                          <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md mb-5">
                            <div className="flex-none text-xl font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-grow text-lg">
                              {item.usershopping.length > 0
                                ? item.usershopping[0].productName
                                : ""}
                            </div>
                            <div className="flex-grow text-lg">
                              {item.address}
                            </div>
                            <div className="flex-grow text-lg">
                              {new Date(Date.now()).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="flex-grow text-lg">
                              {item.usershopping[0].productPrice}
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="text-green-500 mr-2"
                              />
                              <span
                                onClick={() =>
                                  changeStatus(item.userId, "Delevered")
                                }
                                className="text-green-500 font-semibold cursor-pointer"
                              >
                                Accsepted
                              </span>
                            </div>
                            <div>
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="text-red-500 mr-2"
                              />

                              <span
                                onClick={() =>
                                  changeStatus(item.userId, "Cancelled")
                                }
                                className="text-red-500 font-semibold cursor-pointer"
                              >
                                Cancelled
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                </TabPanel>
                <TabPanel value="3">
                  {order.length !== 0 &&
                    order.map((item) =>
                      item.status === "Delevered" ? (
                        <div
                          key={item.userId}
                          className="displayOrder w-full mx-auto bg-white rounded-md h-auto mb-2"
                        >
                          <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md">
                            {/* <div className="flex-none text-xl font-bold">{index + 1}</div> */}
                            <div className="flex-grow text-lg">
                              {item.usershopping[0].productName}
                            </div>
                            <div className="flex-grow text-lg">{item.city}</div>
                            <div className="flex-grow text-lg">
                              {" "}
                              {new Date(Date.now()).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="flex-grow text-lg">
                              {item.usershopping[0].productPrice}
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                className="text-green-500 mr-2"
                              />
                              <span className="text-green-500 font-semibold cursor-pointer">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                </TabPanel>
                <TabPanel value="4">
                {order.length !== 0 &&
                    order.map((item) =>
                      item.status === "Cancelled" ? (
                        <div
                          key={item.userId}
                          className="displayOrder w-full mx-auto bg-white rounded-md h-auto mb-2"
                        >
                          <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md">
                            {/* <div className="flex-none text-xl font-bold">{index + 1}</div> */}
                            <div className="flex-grow text-lg">
                              {item.usershopping[0].productName}
                            </div>
                            <div className="flex-grow text-lg">{item.city}</div>
                            <div className="flex-grow text-lg">
                              {" "}
                              {new Date(Date.now()).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="flex-grow text-lg">
                              {item.usershopping[0].productPrice}
                            </div>
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="text-red-500 mr-2"
                              />
                              <span className="text-red-500 font-semibold cursor-pointer">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManegeOrder;
