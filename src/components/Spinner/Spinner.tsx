import "./Spinner.scss";
import Spinner from "react-bootstrap/Spinner";

const CustomSpinner = () => (
  <div className="spinner-md">
    <Spinner animation="border" variant="dark" />
  </div>
);

export default CustomSpinner;
