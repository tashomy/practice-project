import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="loading-container">
      <ReactLoading type="bars" color="#fff" height={"100px"} width={"100px"} />
    </div>
  );
};

export default Loading;
