import React from "react";
import Header from "./../../../Components/Header/Header";
import AppMenu from "../Adminmenu/Menu";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import useAuth from "./../../../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

function ManegeOrder() {
  const { logout } = useAuth();
  const [value, setValue] = React.useState("1");
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

  return (
    <div>
      <Header />

      <div className="bg-slate-400 min-h-screen w-full flex">
        <div className="h-auto w-[16%]">
          <AppMenu />
        </div>

        <div className="orderContainer w-[80%] p-5 mt-3 h-auto bg-slate-300 mx-auto rounded-md ">
          <div className="w-full h-auto flex justify-between">
            <div className="w-full font-serif font-bold cursor-pointer">
              <h1>Order</h1>{" "}
              <p>
                <span className="text-gray-400 text-xs ">5 order found</span>
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
                    <Tab label="All Order" value="0" />
                    <Tab label="Order" value="1" />
                    <Tab label="Delevered" value="2" />
                    <Tab label="Cancel" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="0">
                  <div className="displayOrder w-full mx-auto rounded-md h-auto">
                    <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md mb-5">
                      <div className="flex-none text-xl font-bold">1</div>
                      <div className="flex-grow text-lg">Smart Watch</div>
                      <div className="flex-grow text-lg">Karachi, Malir</div>
                      <div className="flex-grow text-lg">18/Jan/2020</div>
                      <div className="flex-grow text-lg">1200</div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-green-500 mr-2"
                        />
                        <span className="text-green-500 font-semibold cursor-pointer">
                          Accepted
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="1">
                  <div className="displayOrder w-full mx-auto rounded-md h-auto">
                    <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md mb-5">
                      <div className="flex-none text-xl font-bold">1</div>
                      <div className="flex-grow text-lg">Smart Watch</div>
                      <div className="flex-grow text-lg">Karachi, Malir</div>
                      <div className="flex-grow text-lg">18/Jan/2020</div>
                      <div className="flex-grow text-lg">1200</div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faHourglassHalf}
                          className="text-yellow-500 mr-2"
                        />

                        <span className="text-yellow-500 font-semibold cursor-pointer">
                          Pending
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md">
                      <div className="flex-none text-xl font-bold">1</div>
                      <div className="flex-grow text-lg">Smart Watch</div>
                      <div className="flex-grow text-lg">Karachi, Malir</div>
                      <div className="flex-grow text-lg">18/Jan/2020</div>
                      <div className="flex-grow text-lg">1200</div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faHourglassHalf}
                          className="text-yellow-500 mr-2"
                        />

                        <span className="text-yellow-500 font-semibold">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="displayOrder w-full mx-auto bg-white rounded-md h-auto">
                    <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md">
                      <div className="flex-none text-xl font-bold">1</div>
                      <div className="flex-grow text-lg">Smart Watch</div>
                      <div className="flex-grow text-lg">Karachi, Malir</div>
                      <div className="flex-grow text-lg">18/Jan/2020</div>
                      <div className="flex-grow text-lg">1200</div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-green-500 mr-2"
                        />
                        <span className="text-green-500 font-semibold cursor-pointer">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div className="displayOrder w-full mx-auto bg-white rounded-md h-auto">
                    <div className="w-full flex items-center gap-9 p-4 bg-gray-100 rounded-md">
                      <div className="flex-none text-xl font-bold">1</div>
                      <div className="flex-grow text-lg">Smart Watch</div>
                      <div className="flex-grow text-lg">Karachi, Malir</div>
                      <div className="flex-grow text-lg">18/Jan/2020</div>
                      <div className="flex-grow text-lg">1200</div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="text-red-500 mr-2"
                        />

                        <span className="text-red-500 font-semibold">
                          Cancelled
                        </span>
                      </div>
                    </div>
                  </div>
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
