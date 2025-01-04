import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/products/productsActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ product }) => {
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

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col justify-between h-full">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.description}
          </p>
        </Link>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-blue-900">
              ${product.price}
            </span>
            <span
              className={`ml-3 px-2 py-1 rounded text-xs font-semibold ${
                product.availabilityStatus === "Low Stock"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {product.availabilityStatus}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="text-yellow-500">⭐ {product.rating}</span>
            <span className="ml-2">({product.reviews.length} reviews)</span>
          </div>
        </div>

        <div className="mt-4">
          {cart.some((item) => item.id === product.id) ? (
            <div className="flex">
              <button
                onClick={() => handleRemoveFromCart(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded w-1/2"
              >
                Remove
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ml-4 w-1/2"
              >
                Go to Cart
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded w-full"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
