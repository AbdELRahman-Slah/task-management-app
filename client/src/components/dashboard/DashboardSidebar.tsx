import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Inbox, LogOut, Settings, SquareKanban } from "lucide-react";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import useLogout from "@/hooks/auth/useLogout";

const items = [
  {
    title: "Boards",
    url: "boards",
    icon: SquareKanban,
  },
  {
    title: "Inbox",
    url: "inbox",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

function DashboardSidebar() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { mutate } = useLogout();

  return (
    <Sidebar
      collapsible={isMobile ? "icon" : "none"}
      className={"border rounded-md h-96 w-72"}
    >
      <SidebarHeader>
        <h2 className="text-black dark:text-white font-bold text-2xl border bg-muted rounded-md text-center py-4">
          Dashboard
        </h2>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu className="gap-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton size="lg" asChild>
                <Link
                  className={`flex items-center gap-3 py-5 px-2.5 ${
                    location.pathname.includes(item.url)
                      ? "bg-primary text-primary-foreground hover:!bg-primary"
                      : ""
                  }`}
                  to={`dashboard/${item.url}`}
                >
                  <span>
                    <item.icon size={18} />
                  </span>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <div className="" />
      <SidebarFooter>
        <Button
          variant="destructive"
          className="gap-3"
          onClick={() => {
            mutate();
          }}
        >
          <span>
            <LogOut />
          </span>
          <span className="w-full text-left">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DashboardSidebar;
