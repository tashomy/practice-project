import React from "react";

const Paginate = (props) => {
  let items = [];
  const changePage = (e) => {
    e.preventDefault();
    const num = e.target.text;
    props.change(num);
  };

  for (let number = 1; number <= props.num; number++) {
    const equal = `${number}` === props.pageProp;
    items.push(
      <li className="page-item" key={number}>
        <a className={equal ? "active-page" : ""} href="1" onClick={changePage}>
          {number}
        </a>
      </li>
    );
  }
  return (
    <nav className="paginate" aria-label="Page navigation example">
      <ul>{items}</ul>
    </nav>
  );
};

export default Paginate;
