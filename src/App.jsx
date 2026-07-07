import { Outlet, useLocation } from "react-router";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSettings } from "@/store/settings/settingsActions.js";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTopBtn from "@/components/behaviors/ScrollToTopBtn";
import ModalManager from "@/components/modals/ModalManager";
import { fetchCategories } from "./store/categories/categoriesActions";
import AppInitializer from "./utils/AppInitializer";
import LanguageHandler from "./utils/LanguageHandler";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSettings());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <LanguageHandler />
      <Header />
      <div className="min-h-[calc(100vh-90px)]">
        <AppInitializer>
          <Outlet />
        </AppInitializer>
      </div>
      <Footer />
      <Toaster position="top-center" />
      <ScrollToTopBtn />
      {/* modals */}
      <ModalManager />
    </>
  );
}

export default App;
