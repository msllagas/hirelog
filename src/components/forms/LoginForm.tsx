import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { NavLink, useNavigate } from "react-router";
import { ChangeEvent, ComponentProps, FormEvent, useState } from "react";
import { LoginCredentials } from "@/types/auth.ts";
import { loginUser } from "@/api/auth.ts";
import { useAuth } from "@/contexts/auth.tsx";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [auth, setAuth] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAuth((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await loginUser(auth);
      setUser(user);
      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your HireLog account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  required
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <NavLink to="/signup" className="underline underline-offset-4">
                  Sign up
                </NavLink>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            {/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />*/}
            <div className="absolute inset-0 h-full w-full bg-linear-to-br from-blue-500 to-cyan-50 object-cover dark:brightness-[0.2] dark:grayscale"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
