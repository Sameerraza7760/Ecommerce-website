import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useProduct from "./../../hooks/useProduct";

import {
  faClock,
  faInfoCircle,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./../../Components/Header/Header";
import Footer from "./../../Components/Footer/Footer";
import { useEffect } from "react";
import { userOrder } from "types/types";
import { useSelector } from "react-redux";
import Item from "antd/es/list/Item";

const Blog = () => {
  const id = useSelector((state: any) => state?.user?.user?.id);
  console.log(id);

  const { getOrder } = useProduct();
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [order, setOrder] = useState<userOrder[]>([]);
  const orders = [
    {
      id: "1",
      status: "Pending",
      message: "Your order is pending processing.",
    },
    {
      id: "2",
      status: "Delivered",
      message: "Hooray! Your order has been delivered.",
    },
    {
      id: "3",
      status: "Cancelled",
      message: "Oops! Your order has been cancelled.",
    },
  ];

  useEffect(() => {
    const getOrderFromDb = async () => {
      const order: userOrder[] = await getOrder();

      console.log(order);

      const filteredOrder = order.filter(
        (item) => item.userId?.slice(0, 28) === id
      );

      if (filteredOrder) {
        setAuthenticate(true);
        setOrder(filteredOrder);
      }
    };

    getOrderFromDb();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full h-auto flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md h-[70vh] w-full">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
            🎉 Your Order Notifications 📬
          </h2>

          {authenticate &&
            order.map((order) => (
              <div
                key={order.userId}
                className="mb-6 p-6 rounded-md border border-gray-300 bg-white"
              >
                <div className="flex  mb-4 ">
                  {order.status === "Pending" ? (
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-yellow-500 mr-4"
                    />
                  ) : order.status === "Delevered" ? (
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-green-500 mr-4"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBan}
                      className="text-red-500 mr-4"
                    />
                  )}
                  <div>
                    <span
                      className={`font-semibold ${getStatusColor(
                        order.status
                      )} text-lg`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-end w-full">
                    <div>
                      <h1 className="font-serif ">
                        {order.username.toUpperCase()}
                      </h1>
                      <p>{order.phoneNumber}</p>
                      <p>{order.usershopping[0].productPrice} $</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-700 text-sm">
                      {order.status === "Pending"
                        ? "Your order is pending processing"
                        : "Hooray! Your order has been delivered."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const getStatusColor = (status: any) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500";
    case "Delivered":
      return "text-green-500";
    case "Cancelled":
      return "text-red-500";
    default:
      return "text-gray-700";
  }
};

export default Blog;
