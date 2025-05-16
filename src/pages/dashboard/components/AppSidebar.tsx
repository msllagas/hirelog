import * as React from "react";
import { House } from "lucide-react";

import { NavHeader, NavMain, NavUser } from "@/pages/dashboard/components";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar.tsx";

// This is sample data.
const data = {
  user: {
    name: "Juan Dela Cruz",
    email: "jdc@example.com",
    avatar: "",
  },
  menu: [
    {
      name: "Home",
      url: "/app",
      icon: House,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain menu={data.menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
