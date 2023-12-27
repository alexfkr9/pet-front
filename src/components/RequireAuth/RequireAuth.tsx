import React from "react";
import { useAppSelector } from "../../hooks/hookStore";
import { Outlet, Navigate, useLocation } from "react-router-dom";

interface IRole {
  allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: IRole) => {
  const { token, role } = useAppSelector((state) => state.userReducer);
  const location = useLocation();

  const isAuth =
    token !== null &&
    token !== undefined &&
    role !== null &&
    role !== undefined &&
    allowedRoles.includes(role);

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
