import { Outlet } from "react-router-dom";
import BackToHome from "../../components/BackToHome/BackToHome";
import "./LayoutSecondary.scss";

const LayoutSecondary = () => {
  return (
    <div className="d-flex form-container">
      <div className="form-wrapper">
        <div className="return-home">
          <BackToHome />
        </div>
        <Outlet />
      </div>
      <div className="form-background"></div>
    </div>
  );
};

export default LayoutSecondary;
