import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../features/productsSlice";
import { Link } from "react-router-dom";

function Card({ product }) {
  const cart = useSelector((state) => state.products.cart);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
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
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-1">
          {product.title}
        </h3>
      </Link>

      <div className="text-gray-700 font-semibold  pl-2">
        MRP: ₹ {Math.round(product.price * 83)}
      </div>
      {cart.some((item) => item.id === product.id) ? (
        <div className=" flex justify-around">
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
