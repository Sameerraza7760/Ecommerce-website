import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserPrivateRoute: React.FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  const { user } = useSelector((state: any) => state.user);

  if (!user) {
    return <Navigate to="/Signin" />;

  }
  return element;
  


};

export default UserPrivateRoute;
