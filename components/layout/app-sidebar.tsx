"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { websitePagesWithStaticPaths } from "@/constants/website";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LogOutButton } from "./log-out";
import { ThemeToggle } from "./theme-toggle";

export function AppSidebar({
  userHeader,
  ...props
}: { userHeader: ReactNode } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>{userHeader}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="py-1">
        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <PagesMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <ThemeToggle />
          <LogOutButton />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
function PagesMenu() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {Object.entries(websitePagesWithStaticPaths)
        .filter(([, page]) => !page.isHiddenInSidebar)
        .map(([url, page]) => (
          <SidebarMenuItem key={page.name}>
            <SidebarMenuButton
              asChild
              isActive={
                url === "/" ? url === pathname : pathname.startsWith(url)
              }
            >
              <Link href={url}>
                <page.icon />
                {page.name}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
    </SidebarMenu>
  );
}
