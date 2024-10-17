import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/products/productsActions";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Card({ product }) {
  const cart = useSelector((state) => state.products.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const getQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const quantity = getQuantity(product.id);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:p-4">
      <Link to={`/product/${product.id}`}>
        <img
          src={`/products/${product.imgName}-1-product.webp`}
          alt={product.title}
          className="h-56 w-full rounded-md  "
        />
        <h3 className=" font-semibold text-center text-gray-800 mb-1">
          {product.title}
        </h3>
      </Link>

      <div className="text-gray-700 font-semibold pl-2 text-sm">
        MRP: ₹ {Math.round(product.price * 83)}
      </div>
      {cart.some((item) => item.id === product.id) ? (
        <>
          <div className=" flex justify-around ">
            <button
              className="mt-2 font-bold text-2xl bg-blue-600 text-white pb-1 px-8 rounded-lg hover:bg-blue-700"
              onClick={() => handleDecrementQuantity(product.id)}
            >
              -
            </button>
            <input
              type="text"
              className=" w-8 font-semibold text-center text-lg "
              value={quantity}
              readOnly
            />
            <button
              className="mt-2 font-bold text-2xl bg-blue-600 text-white pb-1 px-8 rounded-lg hover:bg-blue-700"
              onClick={() => handleIncrementQuantity(product.id)}
            >
              +
            </button>
          </div>
          <div className=" flex justify-around ">
            <button
              className="mt-2 mx-3 w-full bg-blue-600 text-white  py-1 rounded-lg hover:bg-blue-700"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          </div>
        </>
      ) : (
        <button
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default Card;
