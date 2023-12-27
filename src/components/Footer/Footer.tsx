import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="sniff-footer">
      <Container>
        <Row>
          <Col xs={12} md={5}>
            <span>Ⓒ 2023 Sniff. All rights reserved.</span>
          </Col>
          <Col xs={12} md={7}>
            <div className="sniff-footer-links pull-right">
              <a href="/" className="sniff-footer-link">
                Політика використання cookie
              </a>
              <a href="/" className="sniff-footer-link">
                Політика конфіденційності
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
