import React, { useState, useEffect } from "react";
import Header from "./../../Components/Header/Header";
import { Modal } from "antd";
import useProduct from "./../../hooks/useProduct";
import { userOrder } from "types/types";
import { useSelector } from "react-redux";
import './style.css'
function Order() {
  const userId = useSelector((state?: any) => state?.user?.user?.id);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [order, setOrder] = useState<userOrder[]>([]);
  const { getOrder } = useProduct();
  const openDetailsModal = (order: any) => {
    setSelectedOrder(order);
  };
  const closeDetailsModal = () => {
    setSelectedOrder(null);
  };
  useEffect(() => {
    const getOrderOfUser = async () => {
      const order = await getOrder();
      const filterOrder = order.filter(
        (item: userOrder) => item.userId?.slice(0,28) === userId
      );
      if (filterOrder) {
        setOrder(filterOrder);
      }
    };
    getOrderOfUser();
  }, []);
  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center \">My Orders</h1>

        {order?.map((order) => (
          <div
            key={order.userId}
            className="bg-white p-6 rounded-md shadow-md mb-6 transition transform hover:scale-105"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="orderDetail text-xl font-semibold">
                Order #{order.userId?.slice(34, 39)}
              </span>
              <span className="orderDate text-gray-500">{order.date}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total:{order.Total}</span>
              <span
                className={`${
                  order.status === "Delivered"
                    ? "text-green-500"
                    : "text-blue-500"
                } font-semibold`}
              >
                {order.status}
              </span>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              onClick={() => openDetailsModal(order)}
            >
              View Details
            </button>
          </div>
        ))}

        <Modal
          title="Order Details"
          open={!!selectedOrder}
          onCancel={closeDetailsModal}
          footer={null}
        >
          {selectedOrder && (
            <div>
              <p>Order ID: {order[0].email}</p>
              <p>{order[0].date}</p>
              <p>Total: {order[0].Total}</p>
              <p>Status: {selectedOrder.status}</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default Order;
