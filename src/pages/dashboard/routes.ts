import { Dashboard } from "@/pages/dashboard";
import { Home, Application, SavedJob } from "@/pages/dashboard/views";

const DASHBOARD_PATH = "/app";

export const dashboardRoutes = {
  path: DASHBOARD_PATH,
  Component: Dashboard,
  children: [
    { index: true, Component: Home },
    { path: `applications`, Component: Application },
    { path: `saved-jobs`, Component: SavedJob },
  ],
};
