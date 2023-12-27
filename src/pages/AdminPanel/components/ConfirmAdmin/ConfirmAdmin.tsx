import React, { useState, useRef } from "react";
import FormPassword from "../../../../components/Form/FormPassword/FormPassword";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Form, Alert } from "react-bootstrap";
import { Toast } from "primereact/toast";
import { useAppDispatch } from "../../../../hooks/hookStore";
import { authActions } from "../../../../store/user/userSlice";
import { authValidationRules } from "../../../../services/validation/ValidationRules";
import { IAuthInputsTypes } from "../../../../types";
import Cookies from "js-cookie";

const ConfirmAdmin = ({
  visible,
  setVisible,
  handleDelete,
  handleChangeRole,
  functionMethod
}: any) => {
  const dispatch = useAppDispatch();
  const toastFatal = useRef<Toast>(null);

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

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const storedFalseAuth = Number(Cookies.get("falseAuth") ?? 1);
    event.preventDefault();
    setValidatedInputs(authValidationRules.validate(inputs));

    if (inputs.email !== "" && inputs.password !== "" && storedFalseAuth <= 3) {
      const dataForm = {
        email: inputs.email,
        password: inputs.password
      };

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(authActions.loginUser(dataForm)).then((data) => {
        if (data.payload !== undefined) {
          if (functionMethod === "DELETE") {
            handleDelete(true);
          } else {
            handleChangeRole(true);
          }
          setVisible(false);
        } else {
          const newFalseAuth = storedFalseAuth + 1;
          Cookies.set("falseAuth", newFalseAuth.toString());
          setShowError(true);
          toastFatal.current?.show({
            severity: "warn",
            summary: "Помилка",
            detail: `Ви ввели невірний логін та/або пароль. Будь ласка введіть дійсний логін та пароль.\nСпроба: ${storedFalseAuth} із 3`,
            life: 3000
          });

          if (storedFalseAuth === 3) {
            const now = new Date();
            const formattedTime = new Date(now.getTime() + 30 * 60 * 1000);
            Cookies.set("falseAuthTime", formattedTime.toString());

            toastFatal.current?.show({
              severity: "error",
              summary: "Помилка",
              detail: "Ваш акаунт заблоковано. Спробуйте ще через 30 хвилин",
              life: 3000
            });

            setTimeout(() => {
              dispatch(authActions.logoutUser());
            }, 3000);
          }
        }
      });
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Скасувати"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Підтвердити"
        onClick={(event) => {
          handleFormSubmit(event);
        }}
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Dialog
        header="Для збереження змін, будь ласка, введіть ваш логін та пароль"
        visible={visible}
        position={"center"}
        style={{ width: "550px" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        draggable={false}
        resizable={false}
      >
        <form className="auth-form">
          <div className="auth-form">
            <Alert variant="danger" show={showError}>
              <p className="text-center mb-0">Невірний логін або пароль</p>
            </Alert>
            <Form.Group
              className="auth-item email-item"
              controlId="email"
              style={{ marginBottom: "30px" }}
            >
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
              <span className="error-message">
                {validatedInputs.email.message}
              </span>
            </Form.Group>
            <Form.Group
              className="auth-item password-item"
              controlId="password"
            >
              <div className="password-header">
                <Form.Label>Пароль</Form.Label>
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
        </form>
      </Dialog>
      <Toast ref={toastFatal} position="top-center" />
    </>
  );
};

export default React.memo(ConfirmAdmin);
