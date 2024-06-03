import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../features/user/userSlice";
import jwt_decode from "jwt-decode";

const RequireAuth = () => {
  const token = useSelector(selectAccessToken);
  const location = useLocation();

  const isAuthenticated = () => {
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  if (!isAuthenticated()) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
