"use client"
import React from "react";
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
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Gem,
  HomeIcon,
  
  LucideFileVideo,
  Search,
  WalletCardsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/app/provider";
const MenuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Create New Video",
    url: "/create-new-video",
    icon: LucideFileVideo,
  },
  {
    title: "Explore",
    url: "/explore",
    icon: Search,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: WalletCardsIcon,
  },
];

const AppSidebar = () => {
  // these all are come from sadecn

  const {user} = useAuthContext();
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex items-center gap-3 w-full justify-center mt-5">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
            <h2 className="text-2xl font-bold text"> Video Gen</h2>
          </div>

          <h2 className="text-lg text-gray-400 text-center mt-3">
            AI Short Video generator
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {" "}
            <div className="mx-5 mt-10">
              <Button className="w-full">+Create New Video</Button>
            </div>
            <SidebarMenu>
              {MenuItems.map((menu, index) => (
                <SidebarMenuItem className="mt-3" key={menu.url || index}>
                  <SidebarMenuButton isActive={path} className="p-5" >
                    <Link href={menu.url} className="flex items-center gap-4">
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-5 border rounded-lg mb-6 bg-gray-800">
          <div className="flex items-center justify-between">
            <Gem/>
            <h2 className="text-gray-600" > {user?.credits} Credits Left</h2>
          </div>
          <Button className="w-full mt-3">Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
