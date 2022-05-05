import React from "react";
import ReactLoading from "react-loading";

const Loading = (props) => {
  return (
    <div className={`loading-container ${props.className}`}>
      <ReactLoading
        type="bars"
        color={props.color}
        height={"100px"}
        width={"100px"}
      />
    </div>
  );
};

export default Loading;
