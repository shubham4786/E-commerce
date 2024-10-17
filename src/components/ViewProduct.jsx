import React, { useState } from "react";
import Rating from "@mui/material/Rating";

const ViewProduct = () => {
  const product = {
    id: 129,
    title: "Realme X",
    description:
      "The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.",
    category: "smartphones",
    price: 299.99,
    discountPercentage: 2.39,
    rating: 4.42, // Average rating
    stock: 87,
    tags: ["smartphones", "realme"],
    brand: "Realme",
    sku: "5E11C5C4",
    weight: 1,
    dimensions: {
      width: 29.32,
      height: 16.3,
      depth: 24.12,
    },
    warrantyInformation: "1 month warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    reviews: [
      {
        rating: 4,
        comment: "Highly recommended!",
        date: "2024-05-23T08:56:21.625Z",
        reviewerName: "Benjamin Foster",
      },
      {
        rating: 4,
        comment: "Very satisfied!",
        date: "2024-05-23T08:56:21.625Z",
        reviewerName: "Madison Collins",
      },
      {
        rating: 5,
        comment: "Fast shipping!",
        date: "2024-05-23T08:56:21.625Z",
        reviewerName: "Emily Johnson",
      },
    ],
    returnPolicy: "7 days return policy",
    meta: {
      createdAt: "2024-05-23T08:56:21.625Z",
      updatedAt: "2024-05-23T08:56:21.625Z",
      barcode: "0139612574728",
      qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    },
    images: [
      "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/1.png",
      "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/2.png",
      "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/3.png",
    ],
    thumbnail:
      "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/thumbnail.png",
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container mx-auto p-6 bg-white">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Product Images */}
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="flex space-x-4 mb-4">
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

        {/* Product Information */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            {product.title}
          </h1>

          {/* Display Overall Rating */}
          <div className="flex items-center mb-4">
            <div className="text-yellow-500 text-lg mr-2">
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={0.5}
                readOnly
              />
              {/* Display stars based on average rating */}
            </div>
            <p className="text-gray-700 text-lg font-semibold">
              {product.rating.toFixed(1)} / 5
            </p>
            <p className="text-sm text-gray-500 ml-2">
              ({product.reviews.length} reviews)
            </p>
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Price and Discount */}
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

          {/* Category, Brand, Availability */}
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

          {/* Product Info Section */}
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

          {/* Add to Cart / Buy Now Button */}
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-blue-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
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

      {/* Return Policy */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Return Policy</h2>
        <p className="text-gray-600">{product.returnPolicy}</p>
      </div>
    </div>
  );
};

export default ViewProduct;
