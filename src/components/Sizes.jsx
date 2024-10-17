import { useDispatch, useSelector } from "react-redux";
import { toggleSizeFilter } from "../redux/products/productsActions";

const Sizes = () => {
  const dispatch = useDispatch();
  const selectedSizes = useSelector((state) => state.products.selectedSizes);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleButtonClick = (size) => {
    dispatch(toggleSizeFilter(size));
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">Sizes</label>
      <div className="flex flex-wrap justify-center gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleButtonClick(size)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
              ${
                selectedSizes.includes(size)
                  ? "bg-gray-500 text-gray-800 "
                  : "bg-gray-300 text-gray-600 "
              } 
               hover:text-slate-800 hover:border-gray-500 hover:font-extrabold transition-colors duration-200 font-medium`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sizes;
