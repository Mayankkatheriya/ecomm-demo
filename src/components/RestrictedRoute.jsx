import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestrictedRoute = ({ children }) => {
  const { userDetails } = useSelector((state) => state.user);

  if (userDetails) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RestrictedRoute;
