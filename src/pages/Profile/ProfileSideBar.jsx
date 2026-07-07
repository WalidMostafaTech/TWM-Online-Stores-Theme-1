import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NavLink, useParams } from "react-router";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { openModal } from "@/store/modals/modalsSlice";
import { FiShoppingCart } from "react-icons/fi";

const ProfileSideBar = () => {
  const { t } = useTranslation();
  const [openSideBar, setOpenSideBar] = useState(false);
  const { settings } = useSelector((state) => state.settings);

  const dispatch = useDispatch();
  const { lang } = useParams();

  const links = [
    {
      name: t("profileSidebar.personalInfo"),
      href: `/${lang}/profile`,
      icon: FaRegUser,
    },
    {
      name: t("profileSidebar.orders"),
      href: `/${lang}/profile/orders`,
      icon: FiShoppingCart,
      hideForInstructor: true,
    },
    {
      name: t("profileSidebar.notifications"),
      href: `/${lang}/profile/notifications`,
      icon: FaRegBell,
    },
  ];

  const sideContent = (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          end
          className="sideBarLink"
          onClick={() => setOpenSideBar(false)}
        >
          <link.icon size={20} />
          {link.name}
        </NavLink>
      ))}

      <button
        onClick={() => dispatch(openModal({ modalName: "logOutModal" }))}
        className="sideBarLink danger"
      >
        <IoIosLogOut />
        {t("profileSidebar.logout")}
      </button>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 p-6 bg-primary">
        <div className="sticky top-20">{sideContent}</div>
      </aside>

      <Sheet open={openSideBar} onOpenChange={setOpenSideBar}>
        <SheetTrigger asChild className="lg:hidden w-fit mt-4 ms-4">
          <Button variant="outline">
            <HiOutlineBars3 />
            {t("profileSidebar.menu")}
          </Button>
        </SheetTrigger>

        <SheetContent
          showCloseButton={false}
          side={lang === "ar" ? "right" : "left"}
          className="w-64 bg-primary border-0"
        >
          <SheetTitle
            asChild
            className="flex items-center justify-center w-full"
          >
            {settings?.header_logo && (
              <div className="w-40 h-20 overflow-hidden mt-4 p-4">
                <img
                  loading="lazy"
                  src={settings?.header_logo}
                  alt="logo"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </SheetTitle>

          <SheetDescription className="sr-only"></SheetDescription>

          <div className="p-4">{sideContent}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSideBar;
