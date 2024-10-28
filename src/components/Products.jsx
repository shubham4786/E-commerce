import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryProducts,
  fetchData,
} from "../redux/products/productsActions";
import { toast, ToastContainer } from "react-toastify";
import Sizes from "./Sizes";
import PriceRange from "./PriceRange";
import ProductCard from "./ProductCard";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "./Carousel";
import BrandFilter from "./BrandFilter";

function Products() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const navigate = useNavigate();

  const { filteredItems, status, error, categories, categoryProducts } =
    useSelector((state) => state.products);

  const uniqueBrands = [
    ...new Set(categoryProducts.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(fetchCategoryProducts(category));
  }, [category]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 pt-2 ">
      <ToastContainer />

      <div className="container mx-auto py-10 ">
        <Carousel categories={categories} category={category} />

        {status === "loading" && (
          <div className="h-[80vh] pt-40 px-10 sm:px-20 md:px-36 lg:px-56 ">
            <LinearProgress />
          </div>
        )}
        {status === "succeeded" && (
          <>
            <div className="flex">
              <div className="w-1/5 p-4 hidden sm:block bg-white shadow-lg rounded overflow-y-scroll no-scrollbar">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                {/* <Sizes /> */}
                <PriceRange />

                {uniqueBrands[0] && <BrandFilter uniqueBrands={uniqueBrands} />}
              </div>
              <div className="w-4/5 pl-3 overflow-y-auto h-screen no-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredItems &&
                    filteredItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
