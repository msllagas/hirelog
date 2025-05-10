import { LoginForm } from "@/components/forms/LoginForm.tsx";

export function Login() {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="mx-auto w-full max-w-sm md:max-w-3xl">
          <LoginForm />

        </div>
      </div>
    </>
  );
}
