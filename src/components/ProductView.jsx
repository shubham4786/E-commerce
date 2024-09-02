import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/productsSlice";
import { useParams } from "react-router-dom";

const ProductView = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((item) => item.id === id)
  );

  console.log(product);

  if (!product) {
    return <div>Product not found</div>;
  }
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto p-8 pt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center gap-2">
          <img
            src={`/products/${product.imgName}-1-product.webp`}
            alt={product.title}
            className="object-cover rounded-lg"
          />
          <img
            src={`/products/${product.imgName}-2-product.webp`}
            alt={product.title}
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.style}</p>
          <p className="text-gray-800 text-2xl font-bold mb-4">
            MRP: ₹ {Math.round(product.price * 83)}
          </p>

          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Available Sizes:</p>
            <div className="flex gap-2">
              {product.availableSizes.map((size) => (
                <button
                  key={size}
                  className="bg-gray-200 text-gray-700 font-bold py-1 px-3 rounded hover:bg-gray-300"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {cart.some((item) => item.id === product.id) ? (
            <button
              onClick={() => handleRemoveFromCart(product.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded ml-4"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded ml-4"
            >
              Add to Cart
            </button>
          )}

          {product.isFreeShipping && (
            <p className="text-green-600 font-semibold mt-2">Free Shipping</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
