import "./PersonalInformation.scss";
import { useAppDispatch } from "../../../hooks/hookStore";
import { authActions } from "../../../store/user/userSlice";
import { clearFavorites } from "../../../store/favorites/favoriteSlice";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userApi } from "../../../Api";
import { Col, Row, Button, Form, Container } from "react-bootstrap";
import FormRadioInput from "../../../components/Form/FormRadio/FormRadioInput";
import { IUser } from "../../../types/index";

const PersonalInformation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logoutUser());
    navigate("/", { replace: true });
    dispatch(clearFavorites());
  };

  const [data, setData] = useState<IUser>();

  const [agreement, setAgreement] = useState(" ");

  const handleChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(value.target.id);
  };

  useEffect(() => {
    userApi
      .getCurrentUser()
      .then((response: any) => {
        setData(response.data);
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, []);
  return (
    <Container>
      <h3 className="user-heading">Твій профіль</h3>
      <Row className="mb-2 justify-content-md-center">
        <Form.Group className="form-group col-4" as={Col}>
          <Form.Label>Прізвище</Form.Label>
          <Form.Control
            required
            type="text "
            placeholder="Last name"
            name="last_name"
            defaultValue={data?.lastName}
          />
        </Form.Group>
      </Row>

      <Row className="mb-2 justify-content-md-center">
        <Form.Group className="form-group col-4" as={Col}>
          <Form.Label>Ім&lsquo;я</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="first_name"
            defaultValue={data?.firstName}
          />
        </Form.Group>
      </Row>
      <Row className="mb-2 justify-content-md-center">
        <Form.Group className="form-group col-4" as={Col}>
          <Form.Label>Номер телефону</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="+380 (XX) XXX-XX-XX"
            name="phone"
            defaultValue={data?.phone}
          />
        </Form.Group>
      </Row>
      <Row className="mb-2 justify-content-md-center">
        <Form.Group className="form-group col-4" as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Вкажіть свою email-адресу"
            name="email"
            defaultValue={data != null ? data.email : ""}
          />
        </Form.Group>
      </Row>
      <Row className="mb-2 justify-content-md-center">
        <Form.Group className="form-group col-4" as={Col} controlId="location">
          <Form.Label>Область</Form.Label>
          <Form.Control
            className="mb-2"
            required
            type="text"
            placeholder="Область"
            defaultValue={data?.location.region}
          />
          <Form.Label>Місто</Form.Label>
          <Form.Control
            className="mb-2"
            required
            type="text"
            placeholder="Місто"
            defaultValue={data?.location.city}
          />
          <Form.Label>Район</Form.Label>
          <Form.Control
            className="mb-2"
            required
            type="text"
            placeholder="Район"
            defaultValue={data?.location.district}
          />
        </Form.Group>
      </Row>
      <Row className="mb-2 justify-content-md-center">
        <Form.Group className="form-group col-4" as={Col}>
          <Form.Label>Я представник організації</Form.Label>
          <Row>
            <Col sm={4}>
              <FormRadioInput
                value="Так"
                name="type-info"
                id="Так"
                defaultChecked={agreement === "Так"}
                handleChange={handleChange}
              />
            </Col>
            <Col sm={4}>
              <FormRadioInput
                value="Ні"
                name="type-info"
                id="Ні"
                defaultChecked={agreement === "Ні"}
                handleChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      {agreement === "Так" && (
        <Row className="mb-2 justify-content-md-center">
          <Form.Group className="form-group col-4" as={Col}>
            <Form.Label>Назва організації</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Вкажіть назву організації"
              defaultValue={data?.organisation}
            />
          </Form.Group>
        </Row>
      )}
      <Row className="m-4 justify-content-md-center">
        <Col className="favorites-content" sm={4}>
          <Link className="favorites-link" to="/my-pets">
            Мої хвостики
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            type="submit"
            className="btn btn-primary"
            onClick={logoutHandler}
          >
            Вийти
          </Button>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="text-center">
          <Link className="return-link" to="/">
            Повернутися на головну сторінку
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalInformation;
