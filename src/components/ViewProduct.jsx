import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  productData,
  removeFromCart,
} from "../redux/products/productsActions";
import { toast, ToastContainer } from "react-toastify";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { LinearProgress } from "@mui/material";

const ViewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, product } = useSelector((state) => state.products);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(productData(id));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="h-[80vh] pt-40 px-10 sm:px-20 md:px-36 lg:px-56  ">
        <LinearProgress />
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`product added to the cart!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container mx-auto p-6 bg-white pt-16">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="flex space-x-4 mb-4">
            <ArrowCircleLeftOutlinedIcon
              sx={{ fontSize: 50 }}
              className=" text-cyan-700 hover:text-cyan-900 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            {product.images.map((image, index) => (
              <img
                key={index}
                className={`w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
                  image === selectedImage ? "border-4 border-blue-500" : ""
                }`}
                src={image}
                alt={`${product.title}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <div className="relative w-full h-auto">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
              src={selectedImage}
              alt={product.title}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            {product.title}
          </h1>

          <div className="flex items-center mb-4">
            <div className="text-yellow-500 text-lg mr-2">
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              {product.rating.toFixed(1)} / 5
            </p>
            <p className="text-sm text-gray-500 ml-2">
              ({product.reviews.length} reviews)
            </p>
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="text-2xl font-semibold text-blue-600 mb-2">
            ${product.price.toFixed(2)}
            <span className="text-sm text-gray-500 line-through ml-2">
              $
              {(
                product.price +
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Category: <span className="text-gray-700">{product.category}</span>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Brand: <span className="text-gray-700">{product.brand}</span>
          </div>
          <div className="text-sm text-gray-500 mb-4">
            Availability:
            <span
              className={`ml-2 font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.availabilityStatus}
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Product Info:
            </h3>
            <p className="mb-2">
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warrantyInformation}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Shipping:</span>{" "}
              {product.shippingInformation}
            </p>
            <p>
              <span className="font-semibold">Dimensions:</span>
              {` ${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}
            </p>
          </div>

          {cart.some((item) => item.id === product.id) ? (
            <>
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded ml-4"
              >
                Remove
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded ml-4"
              >
                Go to Cart
              </button>
            </>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded ml-4"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex items-center mb-2">
                <span className="text-gray-700 font-bold">
                  {review.reviewerName}
                </span>
                <span className="text-yellow-500 text-lg ml-2">
                  <Rating
                    name="half-rating-read"
                    defaultValue={review.rating}
                    precision={0.5}
                    readOnly
                  />
                </span>
              </div>
              <div className="text-gray-700 mb-1">{review.comment}</div>
              <div className="text-xs text-gray-500 mt-1">
                Reviewed on: {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Return Policy</h2>
        <p className="text-gray-600">{product.returnPolicy}</p>
      </div>
    </div>
  );
};

export default ViewProduct;
