import React from "react";
import { Pagination } from "react-bootstrap";

const Paginate = (props) => {
  let active = 1;
  let items = [];

  for (let number = 1; number <= props.num; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <div className="paginate">
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
};

export default Paginate;
