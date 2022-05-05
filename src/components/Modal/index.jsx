import React from "react";

const Modal = (props) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="modal-container">
        <header className="header-modal">
          <h2>{props.title} </h2>
          <button className="button-86" onClick={props.onClick}>
            Close
          </button>
        </header>
        {props.content && <div>{props.content}</div>}
        <div className="content">{props.children}</div>
        <footer className="actions"></footer>
      </div>
    </>
  );
};

export default Modal;
