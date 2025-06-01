import { useAuth } from "@/contexts/auth.tsx";

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl">Welcome back, {user?.name}!</h1>
      </div>
    </>
  );
}

export { Home };
