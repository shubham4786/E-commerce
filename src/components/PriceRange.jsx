import React, { useState, useEffect } from "react";
import {
  toggleFreeShippingFilter,
  updatePriceFilter,
} from "../redux/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, Checkbox, Slider } from "@mui/material";

const PriceRange = () => {
  const { products, priceFilter, maximumPrice, freeShippingFilter } =
    useSelector((state) => state.products);

  const { min, max } = priceFilter;

  const dispatch = useDispatch();

  const handlePriceRangeChange = (newRange) => {
    dispatch(updatePriceFilter(newRange));
  };

  const handleFreeShippingToggle = () => {
    dispatch(toggleFreeShippingFilter());
  };

  return (
    <>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Price Range:</label>
        <Slider
          min={min}
          max={Math.round(maximumPrice)}
          value={max}
          onChange={(e) => handlePriceRangeChange([min, e.target.value])}
        />
        <div className="flex justify-between ">
          <span>${min}</span>
          <span>${Math.round(max)}</span>
        </div>
      </div>
      {/* <div className="mb-6">
        <label className="block mb-2 font-semibold">Free Shipping:</label>
        <FormControlLabel
          control={
            <Checkbox
              checked={freeShippingFilter}
              onChange={handleFreeShippingToggle}
            />
          }
          label="Free Shipping"
        />
      </div> */}
    </>
  );
};

export default PriceRange;
