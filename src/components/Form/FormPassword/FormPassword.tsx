import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../../../styles/_form.scss";
import eye from "../../../assets/icons/eye.png";
import hideEye from "../../../assets/icons/hide.png";

interface propTypes {
  className: string;
  inputName?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormPassword = ({ className, inputName, handleChange }: propTypes) => {
  const [visibleEye, setVisibleEye] = useState(false);
  const handleEyeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { target } = event;
    if (target instanceof HTMLElement) {
      setVisibleEye((visibleEye) => !visibleEye);
    }
  };
  return (
    <div className="form-password-wrapper">
      <Form.Control
        type={visibleEye ? "text" : "password"}
        className={`${className} ${!visibleEye && "form-password-hidden"}`}
        placeholder="Введіть пароль"
        name={inputName}
        onChange={handleChange}
      />
      <button className="btn-eye-toggle" onClick={handleEyeToggle}>
        <img
          src={visibleEye ? eye : hideEye}
          alt="eye"
          className="eye-password"
        />
      </button>
    </div>
  );
};

export default FormPassword;
