import { Button, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./../../Components/Footer/Footer";
import Header from "./../../Components/Header/Header";
import useAuth from "./../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { UserProfile } from "./../../types/types";
import "./style.css";
function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState<string | undefined>("");
  const [userName, setUserName] = useState<string | undefined>("");
  const [UpdateName, setUbdateName] = useState<string>("");

  const [updatePhoto, setUpdatePhoto] = useState<File | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null | undefined>("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const id = useSelector((state?: any) => state?.user?.user?.id);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const { logout, getUser, ubdateUserName, uploadImage } = useAuth();
  const handleLogout = async () => {
    try {
      toast.success("Logout successful!");
      setTimeout(() => logout(), 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoute = (Route: string) => {
    navigate(Route);
  };

  const handleFileChanged = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setUpdatePhoto(e.target.files[0]);
    }
  };
  const updateProfile = async () => {
    let userData: UserProfile = {
     
      id: id,
    };

    if (UpdateName) {
      userData = {
        ...userData,
        userName: UpdateName,
      };
    }
  
    if (updatePhoto) {
      const url = await uploadImage(updatePhoto);
      userData.photurl = url;
    }
  
    if (Object.keys(userData).length > 1) {
      ubdateUserName(userData);
    }
  }

  useEffect(() => {
    const displayCurrentUser = async () => {
      if (id) {
        const Data = await getUser(id);
        setEmail(Data?.email);
        setUserName(Data?.userName);
        setUserPhoto(Data?.photurl);
        console.log("hy==>", Data);
      }
    };
    displayCurrentUser();
  }, [updateProfile]);
  const validUserPhoto = userPhoto || undefined;
  console.log(validUserPhoto);

  return (
    <div>
      <Header />

      <div className="mainProfileContainer h-full flex gap-4 pt-[3%] pl-[5%]">
        <div className="innerMiniContainer h-[40vh] w-[250px] flex flex-col gap-1">
          <div></div>
          <div className="h-[30%] w-full bg-slate-400 rounded-md shadow-md flex  ">
            <img className="profileimage" src={validUserPhoto} alt="" />
            <h1 className="profileName">{userName}</h1>
          </div>
          <div className=" h-[80%] w-full bg-slate-200 rounded-md shadow-md p-4">
            <ul className="cursor-pointer">
              <li
                className="py-2 border-b border-gray-300"
                onClick={() => handleRoute("/Order")}
              >
                My Order
              </li>
              <li
                className="py-2 border-b border-gray-300"
                onClick={() => handleRoute("/WhishList")}
              >
                WishList
              </li>
              <li
                className="py-2 border-b border-gray-300"
                onClick={() => handleRoute("/Notification")}
              >
                Notification
              </li>
              <li
                className="py-2 border-b border-gray-300"
                onClick={() => handleRoute("/Setting")}
              >
                Setting
              </li>
              <li
                className="py-2 border-b border-gray-300"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="innerMiniContainer2  h-[76vh] w-[70%] rounded-md shadow-md bg-slate-100 mb-4 ">
          <div className="h-[20%] w-full border-b border-gray-300 flex justify-between ">
            <div className="w-[90%]">
              {" "}
              <h1 className="costumerName font-serif p-8  ">
                Costumer Profile
              </h1>
            </div>

            <FontAwesomeIcon
              className="Drawer text-xl mt-6 p-5 "
              onClick={toggleDrawer}
              icon={faCircleInfo}
              style={{ fontSize: "2rem" }} // Adjust the size as needed
            />

            <div
              className={`innerMiniContainermb  h-[40vh] w-[250px] flex flex-col gap-1 absolute  ${
                isDrawerOpen ? "block" : "hidden"
              } `}
            >
              <div className="h-[30%] w-full bg-slate-400 rounded-md shadow-md flex items-center">
                <img className="profileimage" src={validUserPhoto} alt="" />
                <h1 className="profileName">{userName}</h1>
              </div>
              <div className="h-[80%] w-full bg-slate-200 rounded-md shadow-md p-4">
                <ul className="cursor-pointer">
                  <li
                    className="py-2 border-b border-gray-300"
                    onClick={() => handleRoute("/Order")}
                  >
                    My Order
                  </li>
                  <li
                    className="py-2 border-b border-gray-300"
                    onClick={() => handleRoute("/WhishList")}
                  >
                    WishList
                  </li>
                  <li
                    className="py-2 border-b border-gray-300"
                    onClick={() => handleRoute("/Notification")}
                  >
                    Notification
                  </li>
                  <li
                    className="py-2 border-b border-gray-300"
                    onClick={() => handleRoute("/Setting")}
                  >
                    Setting
                  </li>
                  <li
                    className="py-2 border-b border-gray-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="costumerDetail pl-[3%] pt-[6%] border-b border-gray-300 flex justify-between h-[60%]">
            <div className="costumerText font-serif cursor-pointer ">
              <h3>
                First Name <span className="text-black ml-5">{userName} </span>
              </h3>
              <h3>
                Last Name <span className="text-black ml-5"> {userName}</span>
              </h3>

              <h3>
                Email <span className="text-black  ml-6">{email}</span>
              </h3>
            </div>
            <div className="profileimagediv w-[30%]  border-gray-300 ">
              <img
                className="Profileimage w-[60%] cursor-pointer"
                src={validUserPhoto ? `${validUserPhoto}` : './../../assets/profile.webp'}
                alt=""
              />
            </div>
          </div>
          <div className="flex justify-between p-8">
            <div>
              <h1 className="text-black-600 ml-5 font-serif">Colected bonus</h1>
              <p className="text-orange-600 ml-5 font-serif">12.25$</p>
            </div>
            <div>
              <Button
                type="primary"
                className="bg-blue-500"
                onClick={showModal}
              >
                Ubdate Profile
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Input
                  placeholder="Ubdate Full Name"
                  onChange={(e) => setUbdateName(e.target.value)}
                />
                <br />
                <br />

                <Input
                  placeholder="Ubdate Photo"
                  type="file"
                  onChange={handleFileChanged}
                />
                <br />
                <br />

                <Button
                  type="primary"
                  className="bg-blue-800"
                  onClick={updateProfile}
                >
                  Ubdate Profile
                </Button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
