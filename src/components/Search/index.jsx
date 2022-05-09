import React from "react";

const Search = (props) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const input = document.querySelector("#search-input");
    console.log(input.value);
    props.onClick(input.value);
  };
  return (
    <div className="search-container">
      <input type="text" id="search-input" />
      <button id="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
