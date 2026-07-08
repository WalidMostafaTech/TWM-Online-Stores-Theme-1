import { Navigate, Outlet, useParams } from "react-router";
import { useSelector } from "react-redux";

const AuthGuard = () => {
  const { lang } = useParams();

  const { isAuthenticated, isEmailVerified } = useSelector((s) => s.auth);

  if (!isAuthenticated) return <Outlet />;

  // لو مسجل بس إيميله مش متفعل، يروح OTP
  if (!isEmailVerified) return <Navigate to={`/${lang}/verify-email`} replace />;

  // لو مسجل وإيميله متفعل، يروح الـ home
  return <Navigate to={`/${lang}`} replace />;
};

export default AuthGuard;
