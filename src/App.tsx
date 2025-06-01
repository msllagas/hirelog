import { RouterProvider } from "react-router";
import router from "@/routes";
import { ThemeProvider } from "@/contexts/theme.tsx";
import { AuthProvider } from "@/contexts/auth.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="hirelog-ui-theme">
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
