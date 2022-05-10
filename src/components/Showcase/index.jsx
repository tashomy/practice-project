import React, { useState } from "react";
import Modal from "../Modal/index";
const Showcase = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setModal(true);
    setName(document.querySelector("#showcase-input").value);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className="container showcase-container">
      {modal && (
        <Modal
          className="showcase-modal animate__animated animate__zoomInRight"
          onClick={closeModal}
        >
          {name}, I am your father
        </Modal>
      )}
      <h1 className="main-title">Star Wars fan page</h1>
      <p className="main-text">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla dolores
        mollitia asperiores minima architecto non, dolore quia, maxime, fuga ab
        deserunt repudiandae molestiae eaque corrupti quod? Dolorum alias illum
        pariatur. Tempora, adipisci possimus iure, facilis minima nemo nobis
        quibusdam libero nihil incidunt eaque quam doloremque. Nihil commodi
        minima. Magni.
      </p>
      <div className="search-container showcase-search">
        <input id="showcase-input" type="text" placeholder="Type your name" />
        <button id="showcase-btn" onClick={handleClick}>
          Click me
        </button>
      </div>
    </div>
  );
};

export default Showcase;
