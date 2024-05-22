import { lazy } from "react";

export interface CustomRoute {
  isPrivate?: boolean;
  path: string;
  name: string;
  element: any;
}

const routes: CustomRoute[] = [
  {
    path: "/login",
    element: lazy(() => import("../Screens/Auth/Login/Login")),
    name: "Login",
  },
  {
    path: "/register",
    element: lazy(() => import("../Screens/Auth/Register/Register")),
    name: "Register",
  }, 
  {
    path: "/forgot_credentials",
    element: lazy(() => import("../Screens/Auth/ForgotCredentials/ForgotCredentials")),
    name: "Forgot Credentials",
  },
  {
    path: "/",
    element: lazy(() => import("../Screens/Dashboard/Dashboard")),
    isPrivate: true,
    name: "Dashboard",
  },
  {
    path: "/modules",
    element: lazy(() => import("../Screens/Dashboard/Modules/Modules")),
    isPrivate: true,
    name: "Modules",
  },
  {
    path: "/profile",
    element: lazy(() => import("../Screens/Dashboard/Profile/Profile")),
    isPrivate: true,
    name: "Profile",
  },
  {
    path: "/settings",
    element: lazy(() => import("../Screens/Dashboard/Settings/Settings")),
    isPrivate: true,
    name: "Setting",
  },
];

export default routes;
