import { type LucideIcon, PlusCircleIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

import { AddJobForm } from "@/pages/dashboard/components/AddJobForm.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";

export function NavMain({
  menu,
}: {
  menu: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <div className="relative flex w-full min-w-0 flex-col p-2">
      <SidebarMenu>
        <SidebarMenuItem className="mb-2">
          <Dialog>
            <form>
              <DialogTrigger
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 cursor-pointer duration-200 ease-linear"
                asChild
              >
                <SidebarMenuButton tooltip="Add Job">
                  <PlusCircleIcon />
                  <span>Add Job</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <AddJobForm />
            </form>
          </Dialog>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarMenu>
        {menu.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <NavLink end to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
