import React from "react";

const Search = (props) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const input = document.querySelector("#search-input");
    console.log(input.value);
    props.onClick(input.value);
  };
  return (
    <div className={`search-container ${props.className}`}>
      <input placeholder={props.placeholder} type="text" id="search-input" />
      <button id="search-btn" onClick={handleSearch}>
        {props.content}
      </button>
    </div>
  );
};

export default Search;
