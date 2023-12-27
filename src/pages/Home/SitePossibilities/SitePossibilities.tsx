import React from "react";
import Eye from "../../../assets/images/eye.svg";
import Heart from "../../../assets/images/heart.svg";
import Paw from "../../../assets/images/paw.svg";
import Pen from "../../../assets/images/pen.svg";

import "./SitePossibilities.scss";
import { Container, Row, Col } from "react-bootstrap";

const HomeSection = () => {
  return (
    <section className="section section-about">
      <Container className="sniff-home-about">
        <Row>
          <Col>
            <h3 className="sniff-home-title">На сайті ти можеш</h3>
          </Col>
        </Row>
        <Row className="sniff-home-row">
          <Col className="sniff-home-item red" sm={12}>
            <span className="sniff-home-icon">
              <img className="sniff-home-img" alt="eye" src={Eye} />
            </span>
            Переглянути профілі тварин
          </Col>
          <Col className="sniff-home-item pink" sm={12}>
            <span className="sniff-home-icon">
              <img className="sniff-home-img" alt="heart" src={Heart} />
            </span>
            Зберегти собі тих, хто сподобався
          </Col>
        </Row>
        <Row className="sniff-home-row">
          <Col className="sniff-home-item yellow" sm={12}>
            <span className="sniff-home-icon">
              <img className="sniff-home-img" alt="pen" src={Pen} />
            </span>
            Написати утримувачу
          </Col>
          <Col className="sniff-home-item purple" sm={12}>
            <span className="sniff-home-icon">
              <img className="sniff-home-img" alt="paw" src={Paw} />
            </span>
            І ще багато іншого!
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomeSection;
