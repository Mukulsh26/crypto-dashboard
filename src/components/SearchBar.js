import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search for a cryptocurrency..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 text-gray-800 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
