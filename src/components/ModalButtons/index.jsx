import React from "react";

const ModalButtons = (props) => {
  const getData = (e) => {
    e.preventDefault();
    const type = e.target.innerHTML.toLowerCase();
    let idFromUrl = `${props.url.charAt(
      props.url.length - 3
    )}${props.url.charAt(props.url.length - 2)}`;
    if (idFromUrl.charAt(0) === "/") {
      idFromUrl = idFromUrl.substring(1);
    }

    props.onClick(type, idFromUrl);
  };
  return (
    <div className={`btn-div ${props.className}`}>
      {props.content.map((item, i) => {
        return (
          <button onClick={getData} key={i}>
            {item.text}
          </button>
        );
      })}
    </div>
  );
};

export default ModalButtons;
