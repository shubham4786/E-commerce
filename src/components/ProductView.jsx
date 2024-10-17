import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/products/productsActions";
import { toast, ToastContainer } from "react-toastify";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

const ProductView = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const cart = useSelector((state) => state.products.cart);

  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.products.find((item) => item.id === id)
  );

  if (!product) {
    return <div>Product not found</div>;
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

  return (
    <div className="container mx-auto p-8 pt-16">
      <ToastContainer />

      <ArrowCircleLeftOutlinedIcon
        sx={{ fontSize: 50 }}
        className=" text-cyan-700 hover:text-cyan-900 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center gap-2 flex-wrap">
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
            <>
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded ml-4"
              >
                Remove
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded ml-4"
              >
                Go to Cart
              </button>
            </>
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
