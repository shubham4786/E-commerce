import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../redux/products/productsActions";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.products.orders);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchOrderHistory(user.email));
    }
  }, [dispatch, user]);

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-8 pt-20">
        <h1 className="text-4xl font-extrabold mb-8">Order History</h1>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 pt-20">
      <h1 className="text-4xl font-extrabold mb-8">Order History</h1>
      <div className="grid grid-cols-1 gap-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
            <p className="mb-2">
              <strong>Name:</strong> {order.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {order.email}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {order.address.street},{" "}
              {order.address.city}, {order.address.postalCode}
            </p>
            <p className="mb-4">
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>

            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex">
                  {/* <img
                    src={`/products/${item.imgName}-1-cart.webp`}
                    alt={item.title}
                    className="h-16 rounded-md"
                  /> */}
                  <div className="pl-4">
                    <h4 className="text-md font-semibold">{item.title}</h4>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-bold">
                  ₹ {Math.round(item.price) * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
