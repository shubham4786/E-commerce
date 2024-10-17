import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/products/productsActions";
import { Link, useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

const Cart = () => {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + Math.round(item.price * 83) * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-8 pt-20">
      <div className="flex">
        <ArrowCircleLeftOutlinedIcon
          sx={{ fontSize: 50 }}
          className=" text-cyan-700 hover:text-cyan-900 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-4xl font-extrabold mb-8 ml-3">Shopping Cart</h1>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 ">
        {cart.length === 0 ? (
          <div className=" text-center ">
            <p className="text-gray-500 text-lg text-center mb-12">
              Your cart is empty
            </p>
            <Link
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded "
              to={"/"}
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4  ">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="col-span-5 sm:col-span-4 grid grid-cols-3 items-center border-b py-3 px-4 hover:bg-gray-50"
                >
                  <div className="col-span-2 flex ">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={`/products/${item.imgName}-1-cart.webp`}
                        alt={item.title}
                        className=" rounded-md  "
                      />
                    </Link>

                    <div className=" m-10">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                      </Link>
                      <p className="text-gray-600">
                        Price: ₹ {Math.round(item.price * 83)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center col-span-1 justify-self-end">
                    <button
                      onClick={() => handleDecrementQuantity(item.id)}
                      className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(item.id)}
                      className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center ">
              <button
                onClick={handleClearCart}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded"
              >
                Clear Cart
              </button>

              <p className="text-2xl font-bold">
                Total Amount: ₹ {totalAmount}
              </p>
              <Link to="/checkout">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
