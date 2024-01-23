
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute: React.FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  const { admin } = useSelector((state: any) => state.admin);

  if (!admin) {
    return <Navigate to="/Signin" />;
  }

  return element;
};
export default AdminPrivateRoute;
