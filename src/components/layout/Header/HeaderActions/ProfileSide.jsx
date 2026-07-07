import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import UserAvatar from "@/components/common/UserAvatar";
import { Link, useNavigate, useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { openModal } from "@/store/modals/modalsSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { BiSolidDownArrow } from "react-icons/bi";

const ProfileSide = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useParams();

  const links = [
    {
      name: t("profileSide.personalInfo"),
      href: `/${lang}/profile`,
      icon: FaRegUser,
    },
    {
      name: t("profileSide.orders"),
      href: `/${lang}/profile/orders`,
      icon: FiShoppingCart,
      hideForInstructor: true,
    },
  ];

  return (
    <>
      {user ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer">
            <BiSolidDownArrow className="text-sm" />
            <UserAvatar
              name={user?.name}
              image={user?.image}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuLabel className="flex items-center gap-2">
              <UserAvatar name={user?.name} image={user?.image} />
              <h3 className="font-semibold">{user?.name}</h3>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {links.map((link) => (
              <DropdownMenuItem
                key={link.name}
                onClick={() => navigate(link.href)}
                className={`cursor-pointer`}
              >
                <link.icon className="text-primary" />
                {link.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                dispatch(openModal({ modalName: "logOutModal" }));
              }}
            >
              <IoIosLogOut />
              {t("profileSide.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link to={`/${lang}/login`} className="rounded-full">
            <Button>{t("profileSide.login")}</Button>
          </Link>
          <Link
            to={`/${lang}/register/teacher`}
            className="rounded-full hidden md:block"
          >
            <Button variant="outline">
              {t("profileSide.joinAsInstructor")}
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default ProfileSide;
