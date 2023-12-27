import React from "react";
import { Link } from "react-router-dom";

export default function BackToHome() {
  return (
    <Link to="/">
      <i className="icon-arrow-left"></i>
      <span>Повернутися на головну сторінку</span>
    </Link>
  );
}
