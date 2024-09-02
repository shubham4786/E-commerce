import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.products.cart);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + Math.round(item.price * 83) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    // Simulate placing an order
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8 pt-20">
      <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-3 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                className="w-full p-3 border rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="cardNumber"
              >
                Credit Card Number
              </label>
              <input
                id="cardNumber"
                type="text"
                className="w-full p-3 border rounded"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex ">
                  <img
                    src={`/products/${item.imgName}-1-cart.webp`}
                    alt={item.title}
                    className=" h-16 rounded-md  "
                  />
                  <div className="pl-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-bold">
                  ₹{Math.round(item.price * 83) * item.quantity}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <h3 className="text-xl font-bold">Total Amount:</h3>
              <p className="text-2xl font-extrabold">₹{totalAmount}</p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
