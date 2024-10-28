import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Carousel = ({ categories, category }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const navigate = useNavigate();

  useEffect(() => {
    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    };

    const carousel = carouselRef.current;
    carousel.addEventListener("scroll", updateScrollButtons);
    return () => carousel.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCategorySelect = (category) => {
    navigate(`/products/${category}`);
    setSelectedCategory(category);
  };

  return (
    <div className=" flex">
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className=" bg-blue-200 text-white p-3 my-3 rounded-xl shadow-lg hover:bg-blue-300 transition-opacity opacity-75 hover:opacity-100"
        >
          <FaArrowLeft size={20} />
        </button>
      )}

      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-2 p-4 bg-gray-100 rounded-lg no-scrollbar"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategorySelect(category)}
            className={`min-w-max bg-white rounded-lg shadow-md cursor-pointer transition-colors 
                ${
                  selectedCategory == category
                    ? "bg-slate-500 text-white"
                    : "hover:bg-blue-200"
                }`}
          >
            <p className="text-center font-semibold py-2 px-3 hover:scale-105">
              {category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </p>
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className=" bg-blue-200 text-white p-3 my-3 rounded-xl shadow-lg hover:bg-blue-300 transition-opacity opacity-75 hover:opacity-100"
        >
          <FaArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Carousel;
