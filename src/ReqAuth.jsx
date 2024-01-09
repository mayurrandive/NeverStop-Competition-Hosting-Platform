import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const location = useLocation();
  if (!token) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
