import { Link } from "react-router-dom";
import "./NavModal.scss";
import Modal from "react-bootstrap/Modal";

const NavModal = ({ showModal, handleClose, textModalBody }: any) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{textModalBody}</Modal.Body>
      <Modal.Footer className="sniff-modal-footer">
        Будь ласка,
        <Link to="/auth-form" onClick={handleClose}>
          увійдіть
        </Link>
        або
        <Link to="/reg-form" onClick={handleClose}>
          зареєструйтесь
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default NavModal;
