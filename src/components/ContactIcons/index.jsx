import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsReddit } from "react-icons/bs";
// import { Link } from "react-router-dom";
const ContactIcons = () => {
  return (
    <div className="contact-icons-wrap">
      <a href="https://www.facebook.com/" target="_blank">
        <BsFacebook size={30} fill="#fff" />
      </a>
      <a href="https://www.instagram.com/" target="_blank">
        <BsInstagram size={30} fill="#fff" />
      </a>
      <a href="https://www.twitter.com/" target="_blank">
        <BsTwitter size={30} fill="#fff" />
      </a>
      <a href="https://www.reddit.com/" target="_blank">
        <BsReddit size={30} fill="#fff" />
      </a>
    </div>
  );
};

export default ContactIcons;
