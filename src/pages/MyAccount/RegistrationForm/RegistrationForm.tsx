import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

import { userApi } from "../../../Api";
import { authActions } from "../../../store/user/userSlice";
import { useAppDispatch } from "../../../hooks/hookStore";
import { regValidationRules } from "../../../services/validation/ValidationRules";
import { inputTypes } from "../../../services/validation/ValidationTypes";
import initMapScript from "../../../services/getLocationScript";
import fbLogo from "../../../assets/icons/facebook.svg";
import "./RegistrationForm.scss";

import FormRadioInput from "../../../components/Form/FormRadio/FormRadioInput";
import FormCheckboxItem from "../../../components/Form/FormCheckbox/FormCheckboxItem";
import FormPassword from "../../../components/Form/FormPassword/FormPassword";
import FormLocation from "../../../components/Form/FormLocation/FormLocation";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const salt = bcrypt.genSaltSync(10);

const RegistrationForm = () => {
  const [inputsCheck, setInputsCheck] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    location: "",
    org_name: "",
    org_rep: false,
    show_contact: false,
    privacy: false
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validator: any = regValidationRules;

  const [validatedInputs, setValidatedInputs] = useState(validator.valid());

  // google map script for location api
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // load google map script after it's mounted
  useEffect(() => {
    void initMapScript().then(() => {
      setIsScriptLoaded(true);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      [event.target.name]: event.target.value
    } as unknown as Pick<inputTypes, keyof inputTypes>;
    setInputsCheck((oldState) => ({ ...oldState, ...newState }));
  };

  const handleRadioChange = () => {
    setInputsCheck((oldState) => ({
      ...oldState,
      org_rep: !inputsCheck.org_rep
    }));
  };

  const handleCheckboxInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      [event.target.name]: event.target.checked
    } as unknown as Pick<inputTypes, keyof inputTypes>;
    setInputsCheck((oldState) => ({ ...oldState, ...newState }));
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    trimInputs(inputsCheck);

    const validation = validator.validate(inputsCheck);
    setValidatedInputs(validation);
    if (validation.isValid === true) {
      const hashPassword = bcrypt.hashSync(inputsCheck.password, salt);
      userApi
        .registerUser({
          firstName: inputsCheck.first_name,
          lastName: inputsCheck.last_name,
          phone: inputsCheck.phone,
          email: inputsCheck.email,
          location: { city: inputsCheck.location },
          organisation: inputsCheck.org_name,
          secret: hashPassword,
          hideContacts: "NO" // false
        })
        .then((response: any) => {
          dispatch(
            authActions.registerUser({ ...inputsCheck, id: response.data.id })
          );
          navigate("/welcome-reg");
          return response.data;
        })
        .catch((err: any) => {
          if (err.response.data === "This email already used") {
            setValidatedInputs((prevInputs: any) => ({
              ...prevInputs,
              email: {
                isInvalid: true,
                message: "Ця поштова адреса вже зайнята"
              },
              isValid: false
            }));
          }
          return err;
        });
    }
  };

  const trimInputs = (inputs: any) => {
    Object.keys(inputs).forEach(
      (k) =>
        (inputs[k] =
          typeof inputs[k] === "string" &&
          k !== "password" &&
          k !== "password_confirmation"
            ? inputs[k].trim()
            : inputs[k])
    );
  };

  const getLocation = (address: any, name: any) => {
    interface Location {
      region: string;
      city: string;
      district: string;
    }

    const { region, city, district }: Location = address;

    const locationData: Location = {
      region,
      city,
      district
    };

    setInputsCheck({
      ...inputsCheck,
      location: locationData.city
    });
  };

  return (
    <form className="registr-form">
      <h2 className="form-heading">Вітаємо у SNIFF!</h2>
      <div className="registr-form-body">
        <Row className="registr-form-row">
          <Form.Group
            className="form-group form-radio-group col-12 col-xl-6"
            as={Col}
          >
            <FormRadioInput
              value="Я простий користувач"
              name="type-info"
              id="type-user"
              defaultChecked={!inputsCheck.org_rep}
              handleChange={handleRadioChange}
            />
          </Form.Group>
          <Form.Group className="form-group col-12 col-xl-6" as={Col}>
            <FormRadioInput
              value="Я представник організації"
              name="type-info"
              id="type-organization"
              defaultChecked={inputsCheck.org_rep}
              handleChange={handleRadioChange}
            />
          </Form.Group>
        </Row>

        <Row className="registr-form-row">
          <Form.Group
            className="form-group form-group-first col-12 col-lg-6"
            as={Col}
          >
            <Form.Label>Прізвище</Form.Label>
            <Form.Control
              className={`form-lastname ${
                validatedInputs.last_name.isInvalid === true && "has-error"
              }`}
              name="last_name"
              type="text"
              value={inputsCheck.last_name}
              placeholder="Вкажіть прізвище"
              onChange={handleInputChange}
            />
            <div className="error-message">
              {validatedInputs.last_name.message}
            </div>
          </Form.Group>
          <Form.Group className="form-group col-12 col-lg-6" as={Col}>
            <Form.Label>Ім&lsquo;я</Form.Label>
            <Form.Control
              className={`form-name ${
                validatedInputs.first_name.isInvalid === true && "has-error"
              }`}
              type="text"
              placeholder="Вкажіть ім&lsquo;я"
              name="first_name"
              value={inputsCheck.first_name}
              onChange={handleInputChange}
            />
            <div className="error-message">
              {validatedInputs.first_name.message}
            </div>
          </Form.Group>
        </Row>

        {inputsCheck.org_rep && (
          <Row className="registr-form-row">
            <Form.Group className="form-group">
              <Form.Label>Назва організації</Form.Label>
              <Form.Control
                className={`form-org-name ${
                  validatedInputs.first_name.isInvalid === true && "has-error"
                }`}
                type="text"
                placeholder="Вкажіть назву організації"
                name="org_name"
                onChange={handleInputChange}
              />
              <div className="error-message">
                {validatedInputs.org_name.message}
              </div>
            </Form.Group>
          </Row>
        )}
        <Row className="registr-form-row">
          <Form.Group className="form-group" controlId="email">
            <Form.Label>Email-адреса</Form.Label>
            <Form.Control
              className={`form-email ${
                validatedInputs.email.isInvalid === true && "has-error"
              }`}
              type="text"
              placeholder="Вкажіть email-адресу"
              name="email"
              value={inputsCheck.email}
              onChange={handleInputChange}
            />
            <div className="error-message">{validatedInputs.email.message}</div>
          </Form.Group>
        </Row>

        <Row className="registr-form-row">
          <Form.Group
            className="form-group form-group-first col-12 col-lg-6"
            as={Col}
            controlId="phone"
          >
            <Form.Label>Номер телефону</Form.Label>
            <Form.Control
              className={`form-phone ${
                validatedInputs.phone.isInvalid === true && "has-error"
              }`}
              type="text"
              placeholder="+380 (XX) XXX-XX-XX"
              name="phone"
              value={inputsCheck.phone}
              onChange={handleInputChange}
            />
            <div className="error-message">{validatedInputs.phone.message}</div>
          </Form.Group>

          <Form.Group
            className="form-group col-12 col-lg-6"
            as={Col}
            controlId="location"
          >
            <Form.Label>Місто</Form.Label>
            <FormLocation
              className={`form-autocomplete ${
                validatedInputs.location.isInvalid === true && "has-error"
              }`}
              placeholder="Вкажіть місто"
              getLocation={getLocation}
              isScriptLoaded={isScriptLoaded}
            />
            <div className="error-message">
              {validatedInputs.location.message}
            </div>
          </Form.Group>
        </Row>

        <Row className="registr-form-row">
          <Form.Group
            className="form-group form-group-first form-group-password col-12 col-lg-6"
            as={Col}
            controlId="password"
          >
            <Form.Label>Пароль</Form.Label>
            <FormPassword
              className={`form-password ${
                validatedInputs.password.isInvalid === true && "has-error"
              }`}
              inputName="password"
              handleChange={handleInputChange}
            />
            <div className="error-message">
              {validatedInputs.password.message}
            </div>
          </Form.Group>
          <Form.Group
            className="form-group col-12 col-lg-6"
            as={Col}
            controlId="passwordSame"
          >
            <Form.Label>Підтвердження паролю</Form.Label>
            <div className="form-password-confirmation-wrapper">
              <FormPassword
                className={`form-password-confirmation ${
                  validatedInputs.password_confirmation.isInvalid === true &&
                  "has-error"
                }`}
                inputName="password_confirmation"
                handleChange={handleInputChange}
              />
            </div>
            <div className="error-message">
              {validatedInputs.password_confirmation.message}
            </div>
          </Form.Group>
        </Row>

        <Form.Group
          className="form-group registr-form-row checkbox-row form-last-row"
          controlId="privacy"
        >
          <FormCheckboxItem
            className={`form-privacy ${
              validatedInputs.privacy.isInvalid === true && "has-error-privacy"
            }`}
            labelName=""
            inputName="privacy"
            handleChange={handleCheckboxInput}
          />
          <div className="error-checkbox">
            {validatedInputs.privacy.message}
          </div>
        </Form.Group>
      </div>
      <div className="registr-form-footer">
        <button
          className="btn-submit btn-primary"
          type="submit"
          onClick={handleFormSubmit}
        >
          Створити профіль
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
        <Link className="form-link" to="/auth-form">
          Я вже маю профіль
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
