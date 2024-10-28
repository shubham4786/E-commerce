import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/products/productsActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
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
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm hover:bg-slate-50 flex flex-col justify-between">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105"
        />
      </Link>
      <div className="text-center">
        <Link to={`/product/${product.id}`}>
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {product.title}
          </h2>
        </Link>

        <div className="text-xl font-semibold text-blue-600 mb-2">
          ${product.price.toFixed(2)}
          <span className="text-sm text-gray-500 line-through ml-2">
            $
            {(
              product.price +
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
          </span>
        </div>

        {cart.some((item) => item.id === product.id) ? (
          <div className="flex">
            <button
              onClick={() => handleRemoveFromCart(product.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded ml-4"
            >
              Remove
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-2 rounded ml-4"
            >
              Go to Cart
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded ml-4"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
