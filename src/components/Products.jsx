import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/products/productsActions";
import { toast, ToastContainer } from "react-toastify";
import Sizes from "./Sizes";
import PriceRange from "./PriceRange";
import ProductCard from "./ProductCard";
import data from "../../data.json";

function Products() {
  const dispatch = useDispatch();

  const { filteredItems, status, error } = useSelector(
    (state) => state.products
  );

  console.log(data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 pt-2">
      <ToastContainer />

      <div className="container mx-auto py-16 ">
        <div className="flex">
          <div className="w-1/5 p-4 bg-white shadow-lg rounded">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <Sizes />
            <PriceRange />
          </div>
          <div className="w-4/5 pl-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {data &&
                data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

              {filteredItems &&
                filteredItems.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
