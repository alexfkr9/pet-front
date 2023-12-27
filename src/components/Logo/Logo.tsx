import React from "react";
import logoImg from "../../assets/images/Logo.svg";

interface ILogoProps {
  height: string;
  width: string;
}

const Logo = ({ width, height }: ILogoProps) => (
  <img src={logoImg} alt="Logo" width={width} height={height} />
);

export default Logo;
