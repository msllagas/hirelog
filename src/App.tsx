import { RouterProvider } from "react-router";
import router from "@/routes";
import { ThemeProvider } from "@/contexts/theme.tsx";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="hirelog-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
