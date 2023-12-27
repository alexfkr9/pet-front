import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";

import { authValidationRules } from "../../../services/validation/ValidationRules";
import { useAppDispatch } from "../../../hooks/hookStore";
import { authActions } from "../../../store/user/userSlice";
import { IAuthInputsTypes } from "../../../types/index";
import fbLogo from "../../../assets/icons/facebook.svg";
import "./AuthForm.scss";

import FormPassword from "../../../components/Form/FormPassword/FormPassword";
import Cookies from "js-cookie";
import { Toast } from "primereact/toast";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useRef<Toast>(null);

  const [showError, setShowError] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [validatedInputs, setValidatedInputs] = useState(
    authValidationRules.valid()
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      [event.target.name]: event.target.value
    } as unknown as Pick<IAuthInputsTypes, keyof IAuthInputsTypes>;
    setInputs((oldState) => ({ ...oldState, ...newState }));
    if (inputs.email !== "" && inputs.password !== "" && showError) {
      setShowError(false);
    }
  };

  const handleAllowedAuth = () => {
    const nowTime = new Date();
    const nexTimeAuth = Cookies.get("falseAuthTime");

    if (nexTimeAuth !== undefined) {
      const lockoutTime = new Date(nexTimeAuth);

      const lockoutTimeWithoutMillis = new Date(
        lockoutTime.getFullYear(),
        lockoutTime.getMonth(),
        lockoutTime.getDate(),
        lockoutTime.getHours(),
        lockoutTime.getMinutes(),
        lockoutTime.getSeconds()
      );

      const nowTimeWithoutMillis = new Date(
        nowTime.getFullYear(),
        nowTime.getMonth(),
        nowTime.getDate(),
        nowTime.getHours(),
        nowTime.getMinutes(),
        nowTime.getSeconds()
      );

      if (
        nowTimeWithoutMillis.getTime() >= lockoutTimeWithoutMillis.getTime()
      ) {
        return true;
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Помилка",
          detail: "Ваш акаунт було заблоковано на 30 хвилин. Спробуйте пізніше",
          life: 3000
        });
        return false;
      }
    } else {
      return true;
    }
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (handleAllowedAuth()) {
      setValidatedInputs(authValidationRules.validate(inputs));
      if (inputs.email !== "" && inputs.password !== "") {
        const dataForm = {
          email: inputs.email,
          password: inputs.password
        };
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(authActions.loginUser(dataForm)).then((data) => {
          if (data.payload !== undefined) {
            Cookies.remove("falseAuth");
            Cookies.remove("falseAuthTime");

            navigate("/");
          } else {
            setShowError(true);
          }
        });
      }
    }
  };

  return (
    <form className="auth-form">
      <h2 className="form-heading">Вітаємо у SNIFF!</h2>
      <div className="auth-form-body">
        <Alert variant="danger" show={showError}>
          <p className="text-center mb-0">Невірний логін або пароль</p>
        </Alert>
        <Form.Group className="auth-item email-item" controlId="email">
          <Form.Label>Email-адреса</Form.Label>
          <Form.Control
            type="email"
            className={`form-email-input ${
              validatedInputs.email.isInvalid === true && "has-error"
            }`}
            placeholder="Вкажіть email-адресу"
            name="email"
            onChange={handleInputChange}
          />
          <span className="error-message">{validatedInputs.email.message}</span>
        </Form.Group>
        <Form.Group className="auth-item password-item" controlId="password">
          <div className="password-header">
            <Form.Label>Пароль</Form.Label>
            <Link className="form-link" to="/forgotpassword">
              Забули пароль
            </Link>
          </div>
          <FormPassword
            className={`form-password ${
              validatedInputs.password.isInvalid === true && "has-error"
            }`}
            inputName="password"
            handleChange={handleInputChange}
          />
          <span className="error-message">
            {validatedInputs.password.message}
          </span>
        </Form.Group>
      </div>
      <div className="auth-form-footer">
        <button
          className="btn-submit btn-primary"
          type="submit"
          onClick={handleFormSubmit}
        >
          Увійти
        </button>
        <div className="form-divider">
          <hr></hr>
          <span>або</span>
          <hr></hr>
        </div>
        <button className="btn-facebook" type="submit">
          <img src={fbLogo} alt="facebook-logo" />
          <div className="form-fb-label">Авторизуватись через Facebook</div>
        </button>
        <Link className="form-link" to="/reg-form">
          В мене немає профілю
        </Link>
      </div>
      <Toast ref={toast} position="top-center" />
    </form>
  );
};

export default AuthForm;
