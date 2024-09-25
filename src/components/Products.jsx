import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/products/productsActions";

function Products() {
  const dispatch = useDispatch();

  const { filteredItems, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 pt-4">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems &&
            filteredItems.map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
