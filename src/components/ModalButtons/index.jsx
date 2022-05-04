import React from "react";

const ModalButtons = (props) => {
  const getData = (e) => {
    e.preventDefault();
    const type = e.target.innerHTML.toLowerCase();
    let id = e.target.id;
    if (id == 0) id = 10;
    props.onClick(type, id);
  };
  return (
    <div className="btn-div">
      {props.content.map((item, i) => {
        return (
          <button
            onClick={getData}
            key={i}
            id={
              props.page.page === 1
                ? `${props.url.charAt(props.url.length - 2)}`
                : `${props.url.charAt(props.url.length - 3)}${props.url.charAt(
                    props.url.length - 2
                  )}`
            }
          >
            {item.text}
          </button>
        );
      })}
    </div>
  );
};

export default ModalButtons;
