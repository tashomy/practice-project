import React from "react";
import icon from "../../assets/icons/icons8-death-star-bubbles-96.png";
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Not found</h1>
      <img src={icon} alt="" />
      <p>Unfortunately this item does not exist!</p>
    </div>
  );
};

export default NotFound;
