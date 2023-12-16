import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CartItem, Product } from "types/types";
import Footer from "./../../Components/Footer/Footer";
import Header from "./../../Components/Header/Header";
import { setCartItem } from "./../../features/Cart/CartSlice";
import useProduct from "./../../hooks/useProduct";


import "./style.css";

function ProductDetail() {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state?.user?.user?.id);
  const [changeImage, setChangeImage] = useState<string | null>(null);
  const [newReview, setNewRewiew] = useState({
    author: "",
    rating: 0,
    content: "",
  });

  const [detail, setDetail] = useState<Product>();
  const { getProductDetail, submitRewiew, rewiew, setRewiew } = useProduct();
  

  const { id } = useParams();
  const dispatch = useDispatch();

  const submitReview = async (productId: string) => {
    await submitRewiew({ newReview, productId });
    newReview.author = " ";
    newReview.content = " ";
  };

  useEffect(() => {
    const getDetail = async () => {
      const ProductData = await getProductDetail(id as string);
      if (ProductData) {
        setDetail(ProductData);
      }
      setRewiew(false);
    };
    getDetail();
  }, [rewiew]);

  const addToCart = (items: CartItem) => {
    notification.success({
      message: "Item Added to Cart",
      description: `${items.productName} has been added to your cart.`,
      placement: "topRight",
    });

    const cartObject: CartItem = { ...items, userId };
    dispatch(setCartItem(cartObject));
    console.log(cartObject);
  };

  const handleChangeImage = (e: any) => {
    setChangeImage(e);
  };

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRewiew((prevReview) => ({ ...prevReview, [name]: value }));
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto mt-8 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="mb-8">
            <img
              src={changeImage ? changeImage : detail?.imageUrl?.[0]}
              alt={detail?.productName}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2
                onClick={() => navigate("/Cart")}
                className="text-2xl font-semibold mb-4 cursor-pointer text-blue-600 flex items-end justify-end"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              </h2>
              <h2 className="text-3xl font-bold mb-4">{detail?.productName}</h2>
              <p className="text-gray-600 mb-6">{detail?.productDiscription}</p>
              <p className="text-2xl text-green-600 mb-6">${detail?.productPrice?.toFixed(2)}</p>
              <button
                onClick={() => addToCart(detail as CartItem)}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-8 hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
            <div>
  <h3 className="text-2xl font-semibold mb-4 text-center">Customer Reviews</h3>
  {detail?.rewiew?.length > 0 ? (
    <ul className="list-none">
      {detail?.rewiew?.map((review, index) => (
        <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
          <div className="flex items-center mb-2">
            <span className="text-xl font-semibold mr-2">{review.author}:</span>
            <span className="text-gray-600">17 feb 2023</span>
          </div>
          <p className="text-gray-800">{review.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-600">No reviews yet. Be the first to write one!</p>
  )}
</div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Product Gallery</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {detail?.imageUrl?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-32 h-24 object-cover rounded-md shadow-md cursor-pointer hover:opacity-80"
                onClick={() => setChangeImage(image)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 p-8 bg-gray-200 rounded-lg shadow-lg">
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Your Name:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              onChange={handleReviewChange}
              value={newReview.author}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating:
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`text-yellow-500 cursor-pointer ${
                    star <= newReview.rating ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Your Review:
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              className="mt-1 p-2 border rounded-md w-full"
              onChange={handleReviewChange}
              value={newReview.content}
              required
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => submitReview(detail?.id as string)}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
