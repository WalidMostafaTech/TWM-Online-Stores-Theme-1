import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";
import ProtectedRoute from "@/components/protectRoutes/ProtectedRoute";
import AuthGuard from "@/components/protectRoutes/AuthGuard";
import VerifyEmailGuard from "@/components/protectRoutes/VerifyEmailGuard";
import CheckVerifiedEmailGuard from "@/components/protectRoutes/CheckVerifiedEmailGuard";

const Home = React.lazy(() => import("../pages/Home/Home"));

const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Payment = React.lazy(() => import("../pages/Payment/Payment"));

const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Account = React.lazy(
  () => import("../pages/Profile/pages/Account/Account"),
);
const Orders = React.lazy(() => import("../pages/Profile/pages/Orders/Orders"));
const OrderDetails = React.lazy(
  () => import("../pages/Profile/pages/OrderDetails/OrderDetails"),
);
const Notifications = React.lazy(
  () => import("../pages/Profile/pages/Notifications/Notifications"),
);

const Login = React.lazy(() => import("../pages/Login/Login"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const RegisterTeacher = React.lazy(
  () => import("../pages/Register/RegisterTeacher/RegisterTeacher"),
);
const RegisterStudent = React.lazy(
  () => import("../pages/Register/RegisterStudent/RegisterStudent"),
);
const VerifyEmail = React.lazy(
  () => import("../pages/VerifyEmail/VerifyEmail"),
);
const ForgotPassword = React.lazy(
  () => import("../pages/ForgotPassword/ForgotPassword"),
);

const Terms = React.lazy(() => import("../pages/Terms/Terms"));
const Policy = React.lazy(() => import("../pages/Policy/Policy"));

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const ErrorPage = React.lazy(() => import("../pages/ErrorPage/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/ar" replace />,
  },
  {
    path: "/:lang",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      { path: "terms-and-conditions", element: <Terms /> },
      { path: "privacy-policy", element: <Policy /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
            children: [
              { index: true, element: <Account /> },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "order-details/:id",
                element: <OrderDetails />,
              },
              { path: "notifications", element: <Notifications /> },
            ],
          },
          {
            path: "cart",
            element: (
              <CheckVerifiedEmailGuard>
                <Cart />
              </CheckVerifiedEmailGuard>
            ),
          },
          {
            path: "payment/:status?",
            element: (
              <CheckVerifiedEmailGuard>
                <Payment />
              </CheckVerifiedEmailGuard>
            ),
          },
        ],
      },

      {
        element: <AuthGuard />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "register/teacher", element: <RegisterTeacher /> },
          { path: "register/student", element: <RegisterStudent /> },
          { path: "forgot-password", element: <ForgotPassword /> },
        ],
      },

      {
        path: "verify-email",
        element: (
          <VerifyEmailGuard>
            <VerifyEmail />
          </VerifyEmailGuard>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
