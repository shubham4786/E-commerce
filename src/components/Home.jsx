import React, { useEffect } from "react";
import { fetchData } from "../redux/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, status, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div className="bg-gray-100">
      {status === "loading" && (
        <div className="h-[80vh] pt-40 px-10 sm:px-20 md:px-36 lg:px-56 ">
          <LinearProgress />
        </div>
      )}
      {status === "succeeded" && (
        <>
          <div className="hero bg-blue-600 text-white h-20 flex items-center justify-center">
            <h1 className="text-3xl font-bold">Welcome to ShopFlex</h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={
                    products.find((product) => product.category === category)
                      .thumbnail
                  }
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:opacity-50 transition hover:scale-105"
                />
                <h2 className="text-center mt-2 font-semibold text-lg">
                  {category
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h2>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
