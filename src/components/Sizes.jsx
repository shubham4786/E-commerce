import { useDispatch, useSelector } from "react-redux";
import { toggleSizeFilter } from "../features/productsSlice";

const Sizes = () => {
  const dispatch = useDispatch();
  const selectedSizes = useSelector((state) => state.products.selectedSizes);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleButtonClick = (size) => {
    dispatch(toggleSizeFilter(size));
  };

  return (
    <div className="p-8">
      <h3 className="text-xl font-semibold mb-4">Sizes</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleButtonClick(size)}
            className={`w-12 h-12 flex items-center justify-center rounded-full border-2 
              ${
                selectedSizes.includes(size)
                  ? "bg-gray-500 text-gray-800 "
                  : "bg-gray-300 text-gray-600 "
              } 
               hover:text-white hover:border-gray-500 transition-colors duration-200`}
          >
            {size}
          </button>
        ))}
      </div>
      {/* <div className="mt-6">
        <h4 className="text-lg font-semibold">Selected Sizes:</h4>
        <p>{selectedSizes.length > 0 ? selectedSizes.join(", ") : "None"}</p>
      </div> */}
    </div>
  );
};

export default Sizes;
