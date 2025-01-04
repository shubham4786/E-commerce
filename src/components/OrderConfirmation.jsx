import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="container mx-auto p-8 pt-20 text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Order Confirmation
        </h1>
        <p className="text-lg text-gray-600">No order details available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl p-8 pt-20">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Order Successfully Placed
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your order!{" "}
          <span className="font-semibold">Order ID:</span> {orderDetails.id}
        </p>

        <Link
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded"
          to={"/"}
        >
          Shop Now
        </Link>
      </div>

      <div className="bg-gray-50 shadow-lg rounded-lg p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Shipping Information
        </h2>
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Name:</span> {orderDetails.name}
        </p>
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Email:</span> {orderDetails.email}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Address:</span>{" "}
          {orderDetails.address.street}, {orderDetails.address.city},{" "}
          {orderDetails.address.postalCode}
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Order Summary
        </h2>
        {orderDetails.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200"
          >
            <div className="flex items-center">
              <img
                src={item.imgName}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md shadow-sm"
              />
              <div className="pl-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="text-lg font-bold text-blue-700">
              ${item.price * item.quantity}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-gray-800">Total Amount:</h3>
          <p className="text-2xl font-extrabold text-blue-700">
            ${orderDetails.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
