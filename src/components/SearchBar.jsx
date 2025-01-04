import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = products
        .filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
        .sort()
        .slice(0, 5);

      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0) {
        navigateToResults(suggestions[selectedIndex].title);
      } else {
        navigateToResults(query);
      }
    }
  };

  const navigateToResults = (searchTerm) => {
    setSuggestions([]);
    setQuery(searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  const handleSuggestionClick = (suggestion) => {
    navigateToResults(suggestion.title);
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 z-10">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className={`px-4 py-2 cursor-pointer ${
                selectedIndex === index
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
