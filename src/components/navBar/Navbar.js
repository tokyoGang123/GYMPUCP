import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/Logo.png";
import { StyledLogo, StyledNavLink } from "../../styles/Navbar";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 400) {
      //960
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          {/* <img src={logo} alt="Logo"></img> */}
          <StyledLogo src={logo} alt="Logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/clases" className="nav-links" onClick={closeMobileMenu}>
              Clases
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ejercicios"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Ejercicios
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/entrenadores"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Entrenadores
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/clientes"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Clientes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/suscripcion"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Suscripción
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
