import React, { useState, useEffect } from "react";
import AppMenu from "../Adminmenu/Menu";
import Header from "./../../../Components/Header/Header";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { UserProfile } from "./../../../types/types";

import { toast } from "react-toastify";
import useAuth from "./../../../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

import { Button, Modal, Upload, message } from "antd";
import TextField from "@mui/material/TextField";

function Adminprofile() {
  const { logout, ubdateUserName, uploadImage,setUpdateAdminProfile,updateAdminProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoImage, setPhotoImage] = useState<File | null>(null);
  const [bio, setBio] = useState("");

  const adminData = useSelector((state?: any) => state.admin.admin[0]);
  console.log(adminData);
  

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //   useEffect(() => {
  //     const getAdminProfile = async () => {
  //       if (adminData.id) {
  //         // const AdminData = await ubdateAdminProfile();
  //         // setAdminEmail(AdminData?.email)
  //         // setAdminName(AdminData?.username)
  //         // setAdminPhoto(AdminData.photourl)
  //       }
  //       getAdminProfile();
  //     };
  //   }, [updateProfile]);

  const handleUpdateProfile = async () => {
    const id = adminData.id;
    let userData: UserProfile = {
      id: id,
    };

    if (name) {
      userData = {
        ...userData,
        userName: name,
      };
    }

    if (phoneNumber) {
      userData = {
        ...userData,
        phonenumber: phoneNumber,
      };
    }
    if (photoImage) {
      const url = await uploadImage(photoImage);
      userData.photurl = url;
    }
    setUpdateAdminProfile(true)

    if (Object.keys(userData).length > 1) {
      updateAdminProfile(userData);
    }
  };
  const handleFileChanged = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      setPhotoImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-800 min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 h-screen">
          <AppMenu />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md w-full md:max-w-md space-y-6">
            <div className="relative w-40 h-40 overflow-hidden rounded-full mx-auto border-4 border-blue-500 transform hover:rotate-6 hover:scale-110 transition-transform duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="object-cover w-full h-full"
              />
       
       
<div
  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer transform hover:rotate-12 hover:scale-125 transition-transform duration-300"
  style={{ backgroundImage: `url(${adminData.image})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <circle cx="12" cy="12" r="12" fill="transparent" />
  </svg>
</div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">{adminData.username}</h2>
              <p className="text-gray-500">Ecommerce Store</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">Email:</p>
                <p className="font-semibold">{adminData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-semibold">{adminData.phonenumber}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-900 font-sans ">Bio:</p>
              <p className="text-sm leading-relaxed">{adminData.Bio}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={showModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              >
                Edit Profile
              </button>
              <Modal
                title="User Details"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {" "}
                <TextField
                  placeholder=" Username"
                  id="outlined-basic-product"
                  label=" Name"
                  variant="outlined"
                  autoComplete="off"
                  style={{ width: "100%", marginBottom: "10px" }}
                  focused
                  color="warning"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  placeholder="Phonenumber"
                  type="number"
                  id="outlined-basic-product"
                  label="Product Name"
                  variant="outlined"
                  autoComplete="off"
                  style={{ width: "100%", marginBottom: "10px" }}
                  focused
                  color="warning"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input type="file" onChange={handleFileChanged} />
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update Profile
                </button>
                <div className="flex flex-col items-center">
                  <Button type="primary" onClick={handleOk}>
                    Save
                  </Button>
                </div>
              </Modal>
            </div>
            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transform hover:scale-125"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transform hover:scale-125"
              >
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transform hover:scale-125"
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transform hover:scale-125"
              >
                <i className="fab fa-stack-overflow fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminprofile;
