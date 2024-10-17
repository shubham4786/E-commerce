import React from "react";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="container mx-auto p-8 pt-20">
        <h1 className="text-4xl font-extrabold mb-8">Order Confirmation</h1>
        <p className="text-lg mb-4">No order details available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 pt-20">
      <h1 className="text-4xl font-extrabold mb-8">Order Confirmation</h1>

      <p className="text-lg mb-4">
        Your order has been placed successfully! <strong>Order ID:</strong>{" "}
        {orderDetails.id}.
      </p>

      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
        <p className="text-lg">
          <strong>Name:</strong> {orderDetails.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {orderDetails.email}
        </p>
        <p className="text-lg">
          <strong>Address:</strong> {orderDetails.address.street},{" "}
          {orderDetails.address.city}, {orderDetails.address.postalCode}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Items Ordered</h3>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {orderDetails.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div className="flex">
              <img
                src={`/products/${item.imgName}-1-cart.webp`} // Assuming you have an image naming convention
                alt={item.title}
                className="h-16 rounded-md"
              />
              <div className="pl-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="text-lg font-bold">
              ₹ {Math.round(item.price) * item.quantity}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <h3 className="text-xl font-bold">Total Amount:</h3>
          <p className="text-2xl font-extrabold">
            ₹ {orderDetails.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
