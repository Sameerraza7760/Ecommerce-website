import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import React, { useState } from "react";
import Footer from "./../../Components/Footer/Footer";
import Header from "./../../Components/Header/Header";
import UserForm from "./../../Pages/UserForm/UserForm";

const defaultCartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    quantity: 2,
    image: "product1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    quantity: 1,
    image: "product2.jpg",
  },
];
function Cart({ cartItems = defaultCartItems }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };
  const handleCheckout = () => {
    // Your checkout logic here
    console.log("Checkout clicked");
    // Close the drawer after checkout
    setDrawerOpen(false);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 p-6 bg-white rounded-md shadow-md h-auto mb-6">
        <h2 className="text-3xl font-semibold mb-4 flex items-center text-gray-800">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="mr-2 text-blue-500"
          />
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border-b border-gray-200 py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4 shadow-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-between items-center">
              <p className="text-xl font-semibold text-gray-800">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <Space>
                <Button
                  type="primary"
                  className="bg-blue-700"
                  onClick={showLargeDrawer}
                >
                  Cheak It Out
                </Button>
              </Space>
              <Drawer
      title={`${size} Drawer`}
      placement="right"
      size={size}
      onClose={onClose}
      visible={open}
      closeIcon={<span className="text-xl">✕</span>}
      maskClosable={false}
      bodyStyle={{ padding: '20px', backgroundColor: '#f4f4f4' }}
      className="rounded-md"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
        <p className="text-gray-500">Provide your information to place the order.</p>
      </div>
      <UserForm />
    </Drawer>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
