import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrandFilter } from "../redux/products/productsActions";
import { Checkbox, FormControlLabel } from "@mui/material";

function BrandFilter({ uniqueBrands }) {
  const dispatch = useDispatch();
  const { selectedBrands } = useSelector((state) => state.products);

  const handleBrandChange = (brand) => {
    dispatch(toggleBrandFilter(brand));
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">Filter by Brand:</label>

      {uniqueBrands.map((brand, index) => (
        <div key={index} className="flex items-center mb-1">
          <FormControlLabel
            control={
              <Checkbox
                id={`brand-${index}`}
                value={brand}
                onChange={() => handleBrandChange(brand)}
                checked={selectedBrands.includes(brand)}
                size="small"
              />
            }
            label={brand}
          />
          {/* <input
            type="checkbox"
            id={`brand-${index}`}
            value={brand}
            onChange={() => handleBrandChange(brand)}
            checked={selectedBrands.includes(brand)}
            className="mr-2"
          />
          <label htmlFor={`brand-${index}`} className="text-sm">
            {brand}
          </label> */}
        </div>
      ))}
    </div>
  );
}

export default BrandFilter;
