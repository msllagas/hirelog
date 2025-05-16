import { createBrowserRouter } from "react-router";
import { Welcome } from "@/pages/home/Welcome.tsx";
import { Login } from "@/pages/auth/Login.tsx";
import { SignUp } from "@/pages/auth/SignUp.tsx";
import { Dashboard } from "@/pages/dashboard";
import { Home } from "@/pages/dashboard/views";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "signup",
    Component: SignUp,
  },
  {
    path: "app",
    Component: Dashboard,
    children: [{ index: true, Component: Home }],
  },
]);

export default router;
