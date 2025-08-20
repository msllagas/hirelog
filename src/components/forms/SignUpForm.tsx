import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { NavLink, useNavigate } from "react-router";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { SignUpCredentials, signUpSchema } from "@/types/auth.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signup } from "@/api/auth.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { useAuth } from "@/contexts/auth.tsx";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function SignUpForm({ className, ...props }: ComponentProps<"div">) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      const response = await signup(values);
      if (response.status === 201) {
        setUser(response.data);
        navigate("/app");
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{ errors: Record<string, string[]>}>;
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        Object.keys(errors).forEach((key) => {
          form.setError(key as keyof SignUpCredentials, {
            type: "server-error",
            message: errors[key][0],
          });
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Join us</h1>
                  <p className="text-muted-foreground text-balance">
                    Let’s set up your HireLog account!
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <NavLink to="/login" className="underline underline-offset-4">
                    Login
                  </NavLink>
                </div>
              </div>
            </form>
          </Form>
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
