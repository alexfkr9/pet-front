import { NavLink } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import NavModal from ".././NavModal/NavModal";
import { useAppSelector } from "../../../hooks/hookStore";
import "./NavItems.scss";

const NavItems = ({ closeMenu }: any) => {
  const [showModal, setShowModal] = useState(false);
  const { token, role } = useAppSelector((state) => state.userReducer);

  const isAuth = token !== null && token !== undefined;
  const isAdmin = token !== null && token !== undefined && role === "ADMIN";

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <Nav className="sniff-nav" onClick={closeMenu}>
        <Nav.Link className="sniff-nav-link" as={NavLink} to="/">
          <span>Головна</span>
        </Nav.Link>

        {/* {isAuth ? (
          <Nav.Link className="sniff-nav-link" as={NavLink} to="/pets">
            <span>Хвостики</span>
          </Nav.Link>
        ) : (
          <Nav.Link className="sniff-nav-link" as={NavLink} to="/my-pets">
            <span>Мої хвостики</span>
          </Nav.Link>
        )} */}

        <Nav.Link className="sniff-nav-link" as={NavLink} to="/happy-stories">
          <span>Щасливі історії</span>
        </Nav.Link>

        <Nav.Link className="sniff-nav-link" as={NavLink} to="/about">
          <span>Про нас</span>
        </Nav.Link>

        {isAdmin && (
          <Nav.Link className="sniff-nav-link" as={NavLink} to="/admin-panel">
            <span>Адмін Панель</span>
          </Nav.Link>
        )}

        {isAuth ? (
          <Nav.Link
            className="sniff-nav-link d-lg-none"
            as={NavLink}
            to="/messages"
          >
            <span>Повідомлення</span>
          </Nav.Link>
        ) : (
          <Button
            variant="link"
            className="sniff-nav-link text-start nav-link d-xl-none"
            onClick={() => handleShowModal}
          >
            Повідомлення
          </Button>
        )}
      </Nav>

      <NavModal
        showModal={showModal}
        handleClose={handleCloseModal}
        textModalBody="Тільки авторизовані користувачі можуть додати тваринку."
      />
    </>
  );
};

export default NavItems;
