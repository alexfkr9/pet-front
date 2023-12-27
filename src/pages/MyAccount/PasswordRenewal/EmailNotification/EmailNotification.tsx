import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const EmailNotification = () => {
  return (
    <div className="form-holder">
      <h2 className="form-holder-header">Перевірте ваш email</h2>
      <div className="text-center">
        <p>
          Ми вислали вам лист на вказану адресу з посиланням на зміну вашого
          паролю.
        </p>
        <p>
          Будь ласка, перевірте папку “Спам”, якщо ви не отримали лист впродовж
          декількох хвилин.
        </p>
      </div>
      <div className="form-btn">
        <Link to="/message" className="btn btn-primary">
          Зрозуміло
        </Link>
      </div>
    </div>
  );
};

export default EmailNotification;
