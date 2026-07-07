import { useDispatch } from "react-redux";
import { openModal } from "@/store/modals/modalsSlice";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router";

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();

  const dispatch = useDispatch();

  const toggleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);

    navigate(newPath);

    dispatch(openModal({ modalName: "loadingModal" }));

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <Button onClick={toggleLang} size="icon" className="rounded-full">
      {lang === "en" ? "AR" : "EN"}
    </Button>
  );
};

export default LanguageSwitcher;
