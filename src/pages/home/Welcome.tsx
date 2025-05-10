import { Button } from "@/components/ui/button.tsx";
import { NavLink } from "react-router";

export function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="my-2 text-center text-2xl font-semibold">
          Welcome to{" "}
          <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-bold">
            HireLog
          </span>
        </h1>

        <div className="space-x-2">
          <Button variant="outline" asChild>
            <NavLink to="/login">Login</NavLink>
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition hover:from-blue-600 hover:via-blue-700 hover:to-blue-800"
            asChild
          >
            <NavLink to="/signup">Sign Up</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
}
