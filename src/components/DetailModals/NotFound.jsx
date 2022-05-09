import React from "react";
import icon from "../../assets/icons/icons8-death-star-bubbles-96.png";
const NotFound = (props) => {
  return (
    <div className={`not-found ${props.className}`}>
      <h2 className="title-modal">Not found</h2>
      <img src={icon} alt="" />
      <p>{props.content}</p>
    </div>
  );
};

export default NotFound;
