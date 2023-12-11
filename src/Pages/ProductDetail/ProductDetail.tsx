import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Product } from "types/types";
import Footer from "./../../Components/Footer/Footer";
import Header from "./../../Components/Header/Header";
import { setCartItem } from "./../../features/Cart/CartSlice";
import useProduct from "./../../hooks/useProduct";
import "./style.css";

function ProductDetail() {
  const [detail, setDetail] = useState<Product>();
  const { getProductDetail } = useProduct();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDetail = async () => {
      const ProductData = await getProductDetail(id as string);
      if (ProductData) {
        setDetail(ProductData);
      }
    };
    getDetail();
  }, []);

  const addToCart = (item: any) => {
    notification.success({
      message: "Item Added to Cart",
      description: `${item.productName} has been added to your cart.`,
      placement: "topRight",
    });
    dispatch(setCartItem(item));
  };

  const product = {
    id: "dashdajhs",
    name: "Sample Product",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    price: 29.99,
    imageUrl: "https://via.placeholder.com/400",
    gallery: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/400",
    ],
    reviews: [
      { id: 1, author: "John Doe", content: "Great product!" },
      { id: 2, author: "Jane Smith", content: "Highly recommended." },
    ],
  };
  return (
    <>
      <Header />
      <div className="container mx-auto mt-8">
        <div className="container mx-auto my-8 p-8 bg-slate-200 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={detail?.imageUrl as string}
                alt={detail?.productName}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:ml-8">
              <h2 className="text-3xl font-bold mb-4">{detail?.productName}</h2>
              <p className="text-gray-600 mb-6">{detail?.productDiscription}</p>
              <p className="text-2xl text-green-600 mb-6">
                ${detail?.productPrice?.toFixed(2)}
              </p>

              <button
                onClick={() => addToCart(detail)}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-8 hover:bg-blue-600"
              >
                Add to Cart
              </button>

              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
                <ul>
                  {product.reviews.map((review) => (
                    <li key={review.id} className="mb-2">
                      <strong>{review.author}:</strong> {review.content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Product Gallery</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {product.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-32 h-24 object-cover rounded-md shadow-md cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
