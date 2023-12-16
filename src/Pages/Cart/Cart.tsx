import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Drawer, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CartItem } from "types/types";
import Footer from "./../../Components/Footer/Footer";
import Header from "./../../Components/Header/Header";
import UserForm from "./../../Pages/UserForm/UserForm";
import {
  setRemoveAllItems,
  setRemoveCartItem,
} from "./../../features/Cart/CartSlice";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
function Cart() {
  const cartItems = useSelector((state?: any) => state?.cart?.cart);
  const userId = useSelector((state?: any) => state?.user?.user?.id);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<DrawerProps["size"]>();
  const totalPrice = cartItems
    .filter((item: CartItem) => item.userId === userId)
    .reduce((total: string, item: CartItem) => total + item?.productPrice, 0);

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const removeAllItemInCart = () => {
    dispatch(setRemoveAllItems());
  };

  const removeItem = (id: string) => {
    dispatch(setRemoveCartItem(id));
  };
  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 p-6 bg-white rounded-md shadow-md h-auto mb-6">
        <div className="h-screen">
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold mb-4 flex items-center text-gray-800">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="mr-2 text-blue-500"
              />
              Your Cart
            </h2>
            <button
              onClick={() => removeAllItemInCart()}
              className="ml-auto h-3 w-4  "
            >
              <FontAwesomeIcon icon={faTrash} color="black text-xl" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems
                .filter((item: CartItem) => item.userId === userId)
                .map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-200 py-4"
                  >
                    <img
                      src={item.imageUrl as string}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md mr-4 shadow-md"
                    />
                    <div className="flex justify-between w-full">
                      <div className="w-[80%]">
                        <h3 className="text-lg font-semibold text-gray-800 font-serif ">
                          {item.productName}
                        </h3>
                        <p className="text-gray-600 font-serif ">
                          ${item.productPrice.toFixed(2)}
                        </p>
                        <p className="text-gray-600 font-serif">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="w-[20%]">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto h-3 w-4  "
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            color="black text-xl"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="mt-4 flex justify-between items-center">
                <p className="text-xl font-semibold text-gray-800 font-sans ">
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
                  width={900} // Use width instead of size
                  onClose={onClose}
                  visible={open}
                  closeIcon={<span className="text-xl">✕</span>}
                  maskClosable={false}
                  bodyStyle={{ padding: "20px", backgroundColor: "#f4f4f4" }}
                  className="rounded-md"
                  styles={{
                    body: { padding: "20px", backgroundColor: "#f4f4f4" },
                  }} // Use styles.body instead of bodyStyle
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order Details
                    </h2>
                    <p className="text-gray-500">
                      Provide your information to place the order.
                    </p>
                  </div>
                  <UserForm Total={totalPrice} />
                </Drawer>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
