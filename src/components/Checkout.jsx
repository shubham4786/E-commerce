import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { placeOrder } from "../redux/products/productsActions";
import { updateAddress } from "../redux/auth/authActions";

const Checkout = () => {
  const cart = useSelector((state) => state.products.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(user?.name || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode || "");
  const [editMode, setEditMode] = useState(!user?.address);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname]);

  const totalAmount = cart.reduce(
    (total, item) => total + Math.round(item.price * 83) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!name || !street || !city || !postalCode) {
      setError("Please fill in all required fields.");
      return;
    }

    const orderId = Math.floor(Math.random() * 1000000);
    const orderDetails = {
      id: orderId,
      name,
      address: { street, city, postalCode },
      email: user.email,
      totalAmount,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: Math.round(item.price * 83),
        quantity: item.quantity,
      })),
    };

    dispatch(placeOrder(orderDetails));
    navigate("/");
    alert(`Order Id- ${orderId} placed successfully!`);
  };

  const handleSaveAddress = () => {
    if (!street || !city || !postalCode) {
      setError("Please fill in all address fields.");
      return;
    }

    const newAddress = { street, city, postalCode };
    dispatch(updateAddress(user, newAddress));
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-8 pt-20">
      <h1 className="text-4xl font-extrabold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>

          {editMode ? (
            <form>
              {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
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
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  id="street"
                  type="text"
                  className="w-full p-3 border rounded"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full p-3 border rounded"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  className="w-full p-3 border rounded"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleSaveAddress}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Address
              </button>
            </form>
          ) : (
            <div>
              <p className="text-lg mb-4">
                <strong>Full Name:</strong> {name}
              </p>
              <p className="text-lg mb-4">
                <strong>Street:</strong> {user?.address?.street}
              </p>
              <p className="text-lg mb-4">
                <strong>City:</strong> {user?.address?.city}
              </p>
              <p className="text-lg mb-4">
                <strong>Postal Code:</strong> {user?.address?.postalCode}
              </p>

              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Address
              </button>
            </div>
          )}
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
                  ₹ {Math.round(item.price * 83) * item.quantity}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <h3 className="text-xl font-bold">Total Amount:</h3>
              <p className="text-2xl font-extrabold">₹ {totalAmount}</p>
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
