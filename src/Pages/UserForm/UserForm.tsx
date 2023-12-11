import { Button, Input, Select, Space } from "antd";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { CartItem, userOrder } from "types/types";
import useProduct from "./../../hooks/useProduct";

const { Option } = Select;

const UserForm = () => {
  const { orderPlaced } = useProduct();
  const cartItems = useSelector((state?: any) => state?.cart?.cart);
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState("");

  const handleCityChange = (value: string) => {
    setCity(value);
  };
  const placeUserOrder = async () => {
    const userItem: userOrder = {
      username,
      email,
      phoneNumber,
      city,
      address,
      usershopping: cartItems,
    };

    await orderPlaced(userItem);
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setCity("");
    setAddress("");
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Input
        placeholder="Full Name"
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
      />
      <Input
        placeholder="Email"
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        placeholder="Phone Number"
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
        onChange={(e) => setPhoneNumber(e.target.value)}
        value={phoneNumber}
      />
      <Select
        placeholder="Select City"
        className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-500 "
        onChange={handleCityChange}
        value={city}
      >
        <Option value="Karachi">Karachi</Option>
        <Option value="Islamabad">Islamabad</Option>
        <Option value="Lahore">Lahore</Option>
        <Option value="Hyderabad">Hyderabad</Option>
        {/* Add more countries as needed */}
      </Select>
      <Input.TextArea
        placeholder="Address"
        rows={4}
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <Button
        type="primary"
        className="bg-blue-500 hover:bg-blue-600 text-white  rounded-full"
        onClick={placeUserOrder}
      >
        Place Order
      </Button>
    </Space>
  );
};

export default UserForm;
