import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";

const VerifyEmailGuard = ({ children }) => {
  const { lang } = useParams();

  const { isAuthenticated, isEmailVerified } = useSelector((s) => s.auth);

  // مش مسجل؟ يروح login
  if (!isAuthenticated) return <Navigate to={`/${lang}/login`} replace />;

  // إيميله متفعل؟ ميقدرش يدخل OTP تاني
  if (isEmailVerified) return <Navigate to={`/${lang}`} replace />;

  return children;
};

export default VerifyEmailGuard;
