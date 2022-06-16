import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../store/auth-context";

const IndexPage = () => {
  const auth = useContext(AuthContext);

  return auth.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default IndexPage;
