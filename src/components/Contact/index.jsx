import React from "react";
import ContactIcons from "../ContactIcons";
import useInput from "../../hooks/useInput";

const Contact = () => {
  const isNotEmpty = (value) => value.trim() !== "";
  const isEmail = (value) => value.includes("@");

  const {
    value: email,
    isValid: emailValid,
    hasError: emailError,
    valueBlurHandler: emailBlurHandler,
    valueChangedHandler: emailChangeHandler,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    value: message,
    isValid: messageValid,
    hasError: messageError,
    valueBlurHandler: messageBlurHandler,
    valueChangedHandler: messageChangeHandler,
    reset: messageReset,
  } = useInput(isNotEmpty);
  const {
    value: name,
    isValid: nameValid,
    hasError: nameError,
    valueBlurHandler: nameBlurHandler,
    valueChangedHandler: nameChangeHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  let formValid = false;

  if (emailValid && messageValid && nameValid) {
    formValid = true;
  }

  const formHandler = (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }

    console.log(email, message);
    emailReset();
    messageReset();
    nameReset();
  };
  return (
    <div className="container contact-container">
      <div className="form-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#2471A3"
            fillOpacity="1"
            d="M0,320L26.7,293.3C53.3,267,107,213,160,186.7C213.3,160,267,160,320,176C373.3,192,427,224,480,234.7C533.3,245,587,235,640,208C693.3,181,747,139,800,117.3C853.3,96,907,96,960,96C1013.3,96,1067,96,1120,112C1173.3,128,1227,160,1280,165.3C1333.3,171,1387,149,1413,138.7L1440,128L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
          ></path>
        </svg>
        <div className="contact-text-top">
          <h3>Contact us</h3>
          <p>Send us a message and we'll try to respond immediately. </p>
        </div>
        <form action="">
          <div className="form-div">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {nameError && (
              <span className="error-form">Name can't be empty</span>
            )}
          </div>
          <div className="form-div">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              id="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailError && (
              <span className="error-form">Email has to contain @</span>
            )}
          </div>
          <div className="form-div">
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Enter your message"
              value={message}
              onChange={messageChangeHandler}
              onBlur={messageBlurHandler}
            ></textarea>
            {messageError && (
              <span className="error-form">Message must not be empty</span>
            )}
          </div>
          <button className="button-86 contact-button">Submit</button>
        </form>
        <ContactIcons />
      </div>
    </div>
  );
};

export default Contact;
