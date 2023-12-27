import { useRef, useState } from "react";
import "./Navigation.scss";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItems from "./NavItems/NavItems";
import NavIcons from "./NavIcons/NavIcons";
import NavButtons from "./NavButtons/NavButtons";

const Navigation = (props: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.classList.add("sniff-navbar-opened");
    } else {
      closeMenu();
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("sniff-navbar-opened");
  };

  return (
    <>
      <Navbar className="sniff-navbar" ref={ref}>
        <Container>
          <button type="button" className="navbar-toggler" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Navbar.Brand className="sniff-navbar-brand">
            <Nav.Link as={NavLink} to="/">
              <Logo height="40" width="64" />
            </Nav.Link>
          </Navbar.Brand>

          <div
            id="basic-navbar-nav"
            className={`navbar-collapse ${isMenuOpen ? "show" : ""}`}
          >
            <NavItems closeMenu={closeMenu}></NavItems>
          </div>

          <div className="sniff-navbar-right">
            <NavIcons></NavIcons>
            <NavButtons></NavButtons>
          </div>
        </Container>
        <div className="bg-layout" onClick={closeMenu}></div>
      </Navbar>
    </>
  );
};

export default Navigation;
