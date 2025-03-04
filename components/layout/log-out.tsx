"use client";

import { Spinner } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { logOut } from "@/lib/auth/mutations";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
export function LogOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SidebarMenuButton
      shouldCloseSidebarOnMobile={false}
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await logOut();
        setIsLoading(false);
      }}
    >
      {isLoading ? <Spinner /> : <LogOutIcon />}
      Log out
    </SidebarMenuButton>
  );
}
