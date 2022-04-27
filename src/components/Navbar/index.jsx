import { Link, NavLink } from "react-router-dom";
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
      <Link to={"/"}>
        <div className="logo"></div>
      </Link>

      <button
        onClick={handleClick}
        className="mobile-nav-toggle"
        aria-controls="nav-list"
        aria-expanded="false"
      ></button>

      <div className="nav">
        <ul id="nav-list" data-visible="false" className="nav-list flex">
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active-nav" : "")}
              to="/people"
            >
              <span>00</span>People
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active-nav" : "")}
              to="/films"
            >
              <span>01</span>Films
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active-nav" : "")}
              to="/starships"
            >
              <span>02</span>Starships
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active-nav" : "")}
              to="/vehicles"
            >
              <span>03</span>Vehicles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active-nav" : "")}
              to="/species"
            >
              <span>04</span>Species
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={(navData) => (navData.isActive ? "active-nav" : "")}
              to="/planets"
            >
              <span>05</span>Planets
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
