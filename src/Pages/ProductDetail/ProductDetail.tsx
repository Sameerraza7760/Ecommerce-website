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

  // Function to handle changes in the new review form

  const { id } = useParams();
  const dispatch = useDispatch();

  const submitReview = async (productId: string) => {
    await submitRewiew({ newReview, productId });
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
      <div className="container mx-auto mt-8  ">
        <div className="container mx-auto my-8 p-8 bg-slate-200 rounded-lg shadow-lg h-[100%]">
          <div className="flex flex-col md:flex-row h-[100%]  ">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={changeImage ? changeImage : detail?.imageUrl?.[0]}
                alt={detail?.productName}
                className="w-[80%] h-[55vh] rounded-lg shadow-lg mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:ml-8">
              <h2
                onClick={() => navigate("/Cart")}
                className="text-2xl font-semibold mb-4 items-end cursor-pointer text-blue-600 h-5 flex justify-end"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              </h2>
              <h2 className="text-3xl font-bold mb-4">{detail?.productName}</h2>

              <p className="text-gray-600 mb-6">{detail?.productDiscription}</p>
              <p className="text-2xl text-green-600 mb-6">
                ${detail?.productPrice?.toFixed(2)}
              </p>

              <button
                onClick={() => addToCart(detail as CartItem)}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-8 hover:bg-blue-600"
              >
                Add to Cart
              </button>

              <div>
                <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
                <ul>
                  {detail?.rewiew?.map((review, index) => (
                    <li key={index} className="mb-2">
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
              {detail?.imageUrl?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-32 h-24 object-cover rounded-md shadow-md cursor-pointer hover:opacity-80"
                  onClick={() => handleChangeImage(image)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="container mx-auto my-8 p-8 bg-slate-200 rounded-lg shadow-lg h-[100%]">
          {/* ... (existing code) */}

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Product Gallery</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {/* ... (existing code) */}
            </div>
          </div>

          {/* New Review Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Add Your Review</h3>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
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
