import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="my-2 text-center text-2xl font-semibold">
          Welcome to <span className="text-blue-500">HireLog</span>
        </h1>

        <div className="space-x-2">
          <Button>Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </>
  );
}

export default App;
