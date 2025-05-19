import * as React from "react";
import { Bookmark, BriefcaseBusiness, House } from "lucide-react";

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
};

const menuItems = [
  {
    name: "Home",
    url: "/app",
    icon: House,
  },
  {
    name: "Applications",
    url: "/app/applications",
    icon: BriefcaseBusiness,
  },
  {
    name: "Saved Jobs",
    url: "/app/saved-jobs",
    icon: Bookmark,
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain menu={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
