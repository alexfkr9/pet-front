import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";
import Image from "react-bootstrap/Image";
import img404 from "../../assets/images/404.jpg";

const NotFound = () => {
  return (
    <div className="page-404 text-center">
      <div className="container">
        <div className="page-404-img">
          <Image src={img404} alt="Not found" />
        </div>
        <h3 className="page-404-title">Упс, такої сторінки не існує!</h3>
        <h4>Сторінку було видалено або адреса виявилася неправильною</h4>
        <Link to="/" className="page-404-link">
          Повернутися на головну сторінку
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
