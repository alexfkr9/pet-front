import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: logic communication with backend API
    navigate("/");
  };

  return (
    <div className="form-holder">
      <h2 className="form-holder-header">Встановити новий пароль</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="newpass-item newpass-item-first password-item">
          <Form.Label>Введіть новий пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Введіть пароль"
          />
        </Form.Group>
        <div className="form-btn">
          <Button className="btn btn-primary" type="submit">
            Підтвердити новий пароль
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPassword;
