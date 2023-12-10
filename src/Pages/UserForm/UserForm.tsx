import { Button, Input, Select, Space } from "antd";
import React from "react";

const { Option } = Select;

const UserForm = () => {
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
      />
      <Input
        placeholder="Email"
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
      />
      <Input
        placeholder="Phone Number"
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
      />
      <Select
        placeholder="Select Country"
        className="w-full border-b-2 border-gray-300 outline-none focus:border-blue-500 "
      >
        <Option value="usa">USA</Option>
        <Option value="canada">Canada</Option>
        {/* Add more countries as needed */}
      </Select>
      <Input.TextArea
        placeholder="Address"
        rows={4}
        className="border-b-2 border-gray-300 outline-none focus:border-blue-500 py-2 px-3"
      />
      <Button
        type="primary"
        className="bg-blue-500 hover:bg-blue-600 text-white  rounded-full"
        //   onClick={onFinish}
      >
        Place Order
      </Button>
    </Space>
  );
};

export default UserForm;
