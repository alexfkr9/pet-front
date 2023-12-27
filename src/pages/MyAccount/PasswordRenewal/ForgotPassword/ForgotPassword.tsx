import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: logic communication with backend API
    navigate("/emailnotification");
  };
  return (
    <div className="form-holder">
      <h2 className="form-holder-header">Забули пароль?</h2>
      <p className="form-holder-text text-center">
        Вкажіть електронну пошту, яка зв’язана з вашим профілем, і ми вишлемо
        вам на неї інструкцію для створення нового паролю.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="forgot-item email-item">
          <Form.Control
            type="email"
            name="email"
            placeholder="Вкажіть email-адресу"
          />
          <div className="form-btn">
            <Button className="btn btn-primary" type="submit">
              Змінити пароль
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ForgotPassword;
