import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/Logo.svg";
import "./PageWelcome.scss";
import { Link } from "react-router-dom";
import { userApi } from "../../Api";

interface propTypes {
  welcomeText?: string;
  button?: string;
  footer?: string | JSX.Element;
}

const PageWelcome = ({ welcomeText, button, footer }: propTypes) => {
  const [name, setName] = useState("");
  useEffect(() => {
    userApi
      .getCurrentUser()
      .then((response: any) => {
        const { firstName, lastName } = response.data;
        setName(`${firstName} ${lastName}`);
      })
      .catch((err: any) => {
        return err;
      });
  }, []);

  return (
    <div className="message_wrapper">
      <div className="message_container">
        <div className="site-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="message-card">
          <div className="card__details">
            <div className="card-title">Вітаємо, {name}!</div>
            <p className="card-text">{welcomeText}</p>
            <div className="message_button">
              <Link to="/" className="btn btn-primary reset-button message-btn">
                {button}
              </Link>
            </div>
            <hr />
            <div className="message-footer-content">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageWelcome;
