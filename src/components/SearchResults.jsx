import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import { ToastContainer } from "react-toastify";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const { products } = useSelector((state) => state.products);

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      const filteredResults = products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [query, products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 mt-10">
      <ToastContainer />
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <Card key={result.id} product={result} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No results found for "{query}".
        </p>
      )}
    </div>
  );
};

export default SearchResults;
