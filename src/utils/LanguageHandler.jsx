import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import i18n from "@/i18n";
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/languageSlice/languageSlice";

const LanguageHandler = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!["ar", "en"].includes(lang)) {
      navigate(`/ar${location.pathname}`, { replace: true });
      return;
    }

    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, location.pathname, navigate, dispatch]);

  return null;
};

export default LanguageHandler;
