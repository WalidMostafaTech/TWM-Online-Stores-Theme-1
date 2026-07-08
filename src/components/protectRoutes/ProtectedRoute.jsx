import { Navigate, Outlet, useParams } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { lang } = useParams();

  const { isAuthenticated } = useSelector((s) => s.auth);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/${lang}/login`} replace />
  );
};

export default ProtectedRoute;
