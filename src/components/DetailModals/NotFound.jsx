import React from "react";
import icon from "../../assets/icons/icons8-death-star-bubbles-96.png";
const NotFound = (props) => {
  return (
    <div className="not-found">
      <h1>Not found</h1>
      <img src={icon} alt="" />
      <p>{props.content}</p>
    </div>
  );
};

export default NotFound;
