import { RouterProvider } from "react-router";
import router from "@/routes";
import { ThemeProvider } from "@/contexts/theme.tsx";
import { AuthProvider } from "@/contexts/auth.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster} from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="hirelog-ui-theme">
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster
              mobileOffset={{ bottom: "16px" }}
              position="top-right"
              duration={2000}
            />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
