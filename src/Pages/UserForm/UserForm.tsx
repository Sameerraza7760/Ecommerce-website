import { Button, Input, Select, Form, Row, Col, message } from "antd";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { CartItem, userOrder } from "types/types";
import useProduct from "./../../hooks/useProduct";
import { useDispatch } from "react-redux";
import { setRemoveAllItems } from "./../../features/Cart/CartSlice";
const { Option } = Select;
interface UserFormProps {
  Total: number;
  // Add other props as needed
}
const UserForm: React.FC<UserFormProps> = ({ Total }) => {
  const dispatch=useDispatch()
  const { orderPlaced } = useProduct();
  const cartItems = useSelector((state?: any) => state?.cart?.cart);
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<string>("Pending");

  const [form] = Form.useForm();
  console.log(Total);

  // const Total = cartItems?.reduce((acc: number, item: userOrder) => {
  //   if (item.usershopping?.[0]) {
  //     return acc + item.usershopping[0].productPrice;
  //   }
  //   return acc;
  // }, 0);

  // console.log(Total);

  const handleCityChange = (value: string) => {
    setCity(value);
  };
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
    };
    for (let key in userItem) {
      if (!userItem[key as keyof userOrder]) {
        message.warning("Please Fill All Inputs");
        return;
      }
    }
    await orderPlaced(userItem);
    form.resetFields();
    dispatch(setRemoveAllItems());
  };
  return (
    <Form
      form={form}
      onFinish={placeUserOrder}
      layout="vertical"
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
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
              placeholder="Full Name"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input
              className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Select City"
            name="city"
            initialValue="Karachi"
            rules={[{ required: true, message: "Please select your city" }]}
          >
            <Select
              className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-500"
              onChange={handleCityChange}
              value={city || "Karachi"}
            >
              <Option value="Karachi">Karachi</Option>
              <Option value="Islamabad">Islamabad</Option>
              <Option value="Lahore">Lahore</Option>
              <Option value="Hyderabad">Hyderabad</Option>
              {/* Add more cities as needed */}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input.TextArea
          className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          rows={4}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          htmlType="submit"
          onClick={placeUserOrder}
        >
          Place Order
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
