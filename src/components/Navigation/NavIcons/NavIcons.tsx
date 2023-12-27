import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavIcons.scss";
import NavIconModal from ".././NavModal/NavModal";
import Nav from "react-bootstrap/Nav";
import IconHeart from "../../Icons/Heart";
import IconMessage from "../../Icons/Message";
import { useAppDispatch, useAppSelector } from "../../../hooks/hookStore";
import { favoriteThunks } from "../../../store/favorites";

const NavIcons = (props: any) => {
  const dispatch = useAppDispatch();
  const { favoriteList } = useAppSelector((state) => state.favoriteReducer);
  const { userId } = useAppSelector((state) => state.userReducer);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        if (userId !== null && !isNaN(userId)) {
          await dispatch(favoriteThunks.fetchFavourites(userId));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    })();
  }, [dispatch, userId]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const amountInFavorites =
    favoriteList?.length > 0 ? (
      <span className="sniff-nav-icon-badge">{favoriteList.length}</span>
    ) : (
      ""
    );

  return (
    <>
      <Nav className="sniff-nav-icons">
        <div className="sniff-nav-icon d-none d-xl-block" onClick={handleShow}>
          <IconMessage />
          {/* TODO: add logic for visible badge isAuth && hasMessage */}
          {/* <span className="sniff-nav-icon-badge">#</span> */}
        </div>
        <NavLink className="sniff-nav-icon" to="/favorites">
          <IconHeart />
          {/* TODO: add logic for visible badge if isAuth && hasFavorites */}
          {amountInFavorites}
        </NavLink>
      </Nav>

      <NavIconModal
        showModal={showModal}
        handleClose={handleClose}
        textModalBody="Тільки авторизовані користувачі можуть переглядати повідомлення."
      />
    </>
  );
};

export default NavIcons;
