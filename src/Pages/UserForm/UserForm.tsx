import React, { useState } from "react";
import { Row, Col, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { userOrder } from "types/types";
import { setRemoveAllItems } from "../../store/slice/CartSlice";
import useProduct from "../../hooks/useProduct";

const { Option } = Select;

interface UserFormProps {
  Total: number;
  // Add other props as needed
}

const UserForm: React.FC<UserFormProps> = ({ Total }) => {
  const dispatch = useDispatch();
  const { orderPlaced } = useProduct();
  const cartItems = useSelector((state?: any) => state?.cart?.cart);
  console.log("hi", cartItems);

  const userId = useSelector((state: any) => state?.user?.user?.uid);

  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<string>("Pending");

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  // console.log(userID);

  const date = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  const placeUserOrder = async () => {
    const userItem: userOrder = {
      username,
      email,
      phoneNumber,
      city,
      address,
      usershopping: cartItems,
      status,
      Total,
      date,
      userId,
    };

    for (let key in userItem) {
      if (!userItem[key as keyof userOrder]) {
        alert("Please Fill All Inputs");
        return;
      }
    }

    await orderPlaced(userItem);
    // Reset form or dispatch an action to reset the relevant state
    setUserName("");
    setEmail("");
    setPhoneNumber("");
    setCity("");
    setAddress("");
    setStatus("");

    dispatch(setRemoveAllItems());
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <div>
            <label>Full Name</label>
            <Input
              className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
              placeholder="Full Name"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div>
            <label>Email</label>
            <Input
              className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <div>
            <label>Phone Number</label>
            <Input
              className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <div className="mt-5">
            <Select
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-500"
              onChange={handleCityChange}
              value={city || "Select the City"}
            >
              <Option value="Karachi">Karachi</Option>
              <Option value="Islamabad">Islamabad</Option>
              <Option value="Lahore">Lahore</Option>
              <Option value="Hyderabad">Hyderabad</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <div>
        <label>Address</label>
        <Input.TextArea
          className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          rows={4}
        />
      </div>
      <div>
        <Button
          type="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          onClick={placeUserOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
