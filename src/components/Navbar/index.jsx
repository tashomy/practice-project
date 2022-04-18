import { Link } from "react-router-dom";
const Navbar = () => {
  const handleClick = () => {
    const primaryNav = document.querySelector(".nav-list");
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const visibility = primaryNav.getAttribute("data-visible");
    if (visibility === "false") {
      primaryNav.setAttribute("data-visible", true);
      navToggle.setAttribute("aria-expanded", true);
    } else {
      primaryNav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  };

  return (
    <div className="header flex">
      <div className="logo"></div>

      <button
        onClick={handleClick}
        className="mobile-nav-toggle"
        aria-controls="nav-list"
        aria-expanded="false"
      ></button>

      <div className="nav">
        <ul id="nav-list" data-visible="false" className="nav-list flex">
          <li className="nav-item">
            <Link to={"/People"}>
              <span>00</span>People
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/films"}>
              <span aria-hidden="true">01</span>Films
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/starships"}>
              <span aria-hidden="true">02</span>Starships
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/vehicles"}>
              <span aria-hidden="true">03</span>Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/species"}>
              <span aria-hidden="true">04</span>Species
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/planets"}>
              <span aria-hidden="true">05</span>Planets
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
