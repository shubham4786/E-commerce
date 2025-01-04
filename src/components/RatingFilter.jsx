import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRatingFilter } from "../redux/products/productsActions";
import { Rating } from "@mui/material";

function RatingFilter() {
  const dispatch = useDispatch();
  const { ratingFilter } = useSelector((state) => state.products);

  const handleRatingChange = (event) => {
    const selectedRating = parseFloat(event.target.value);
    dispatch(setRatingFilter(selectedRating));
  };

  return (
    <div className=" mb-4">
      <label className="block mb-2 font-semibold">Filter by Rating:</label>
      <div className="flex items-center justify-center ">
        <Rating
          name="half-rating"
          defaultValue={ratingFilter}
          onChange={handleRatingChange}
          precision={0.5}
        />
        <p className="text-gray-700 text-lg font-semibold ml-3 ">
          {ratingFilter.toFixed(1)} / 5
        </p>
      </div>
    </div>
  );
}

export default RatingFilter;
