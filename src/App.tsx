import { RouterProvider } from "react-router";
import router from "@/routes";
import { ThemeProvider } from "@/contexts/theme.tsx";
import { AuthProvider } from "@/contexts/auth.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="hirelog-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
