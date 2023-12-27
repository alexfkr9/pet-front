import { Link } from "react-router-dom";
import IconUser from "../../Icons/User";
import Paw from "../../../assets/images/paw.svg";
import "./NavButtons.scss";
import NavModal from ".././NavModal/NavModal";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useAppSelector } from "../../../hooks/hookStore";

const NavButtons = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAppSelector((state) => state.userReducer);
  const { userId } = useAppSelector((state) => state.userReducer);

  const isAuth = token !== null && token !== undefined;
  const isAuthClass = isAuth ? "btn-authorized" : "";

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const redirectUrl =
    userId !== null && !Number.isNaN(userId) ? "/my-account" : "/auth-form";

  return (
    <>
      <Nav>
        <a className="sniff-nav-btn" href={redirectUrl}>
          <span className="d-none d-xl-block">
            {isAuth ? "Твій профіль" : "Авторизуватися"}
          </span>
          <span className={`d-xl-none ${isAuthClass}`}>
            <IconUser />
          </span>
        </a>
        {isAuth ? (
          <Link className="sniff-nav-btn-black" to="/add-pet">
            <span className="d-none d-xl-block">Додати тваринку</span>
            <span className="d-xl-none">
              <img alt="Paw" src={Paw} />
            </span>
          </Link>
        ) : (
          <div className="sniff-nav-btn-black" onClick={handleShow}>
            <span className="d-none d-xl-block">Додати тваринку</span>
            <span className="d-xl-none">
              <img alt="Paw" src={Paw} />
            </span>
          </div>
        )}
      </Nav>

      <NavModal
        showModal={showModal}
        handleClose={handleClose}
        textModalBody="Тільки авторизовані користувачі можуть додати тваринку."
      />
    </>
  );
};

export default NavButtons;
