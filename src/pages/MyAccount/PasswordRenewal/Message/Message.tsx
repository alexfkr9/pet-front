import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../../assets/images/Logo.svg";
import "./Message.scss";

const Message = () => {
  return (
    <div className="message_wrapper">
      <div className="message_container">
        <div className="site-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="message-card">
          <div className="card__details">
            <div className="card-title">Вітаємо, Марія Джордж!</div>
            <p className="card-text">
              Ми отримали запит на скидання пароля для вашого профілю на SNIFF.
              Натисніть на посилання, щоб скинути свій пароль:
            </p>
            <div className="message_button">
              <a
                href="/newpassword"
                className="btn btn-primary reset-button message-btn"
              >
                Скинути пароль
              </a>
            </div>
            <hr />
            <div className="message-footer-content">
              <p className="message-footer-text">
                Якщо ви не робили запит на скидання пароля, то можете просто
                проігнорувати цей лист.
              </p>
              <p className="message-footer-text">
                Якщо кнопка “Скинути пароль” не працює, то спробуйте скопіювати
                і вставити URL у свій браузер. Якщо ви все ще маєте проблеми зі
                зміною паролю, то{" "}
                <span className="label-text-us">напишіть нам.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
