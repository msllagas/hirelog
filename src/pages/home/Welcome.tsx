import { Button } from "@/components/ui/button.tsx";
import { NavLink } from "react-router";

export function Welcome() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="my-2 text-center text-2xl font-semibold">
          Welcome to <span className="text-blue-500">HireLog</span>
        </h1>

        <div className="space-x-2">
          <Button asChild>
            <NavLink to="/login">Login</NavLink>
          </Button>
          <Button asChild>
            <NavLink to="/signup">Sign Up</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
}
