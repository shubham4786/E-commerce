import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../features/productsSlice";

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-8 pt-20">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-4">
                <div>
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-gray-700 font-semibold text-lg pl-2">
                  MRP: {Math.round(item.price * 83)}
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleClearCart}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
