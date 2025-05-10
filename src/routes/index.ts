import { createBrowserRouter } from "react-router";
import { Welcome } from "@/pages/home/Welcome.tsx";
import { Login } from "@/pages/auth/Login.tsx";
import { SignUp } from "@/pages/auth/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "login",
    Component: Login
  },
  {
    path: "signup",
    Component: SignUp
  }
]);

export default router;
