import { ThemeToggle } from "@/components/global/theme-toggle";
import { CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import useLogout from "@/hooks/auth/useLogout";
import { SidebarTrigger } from "../ui/sidebar";

const DashboardNavbar = () => {
  const isMobile = useIsMobile();
  const { mutate } = useLogout();

  return (
    <header>
      <nav className="bg-card backdrop-blur-sm border-b border-border/50 px-2 md:px-10 lg:px-20 py-4">
        <div className="mx-auto flex items-center justify-between">
          <Link to={"/dashboard/boards"} className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg shadow-primary/30 shadow-sm">
              <CircleCheckBig className="h-6 w-6 text-primary-foreground" />
            </div>
            {!isMobile && (
              <span className="text-xl font-bold text-foreground">
                TaskFlow
              </span>
            )}
          </Link>

          <div className="flex items-center gap-4">
            {!isMobile && <ThemeToggle />}
            {isMobile && (
              <SidebarTrigger className="h-10 w-10" variant="outline" />
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback className="bg-sky-500 text-white">
                    A
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-card/95 backdrop-blur-sm border-border/50"
              >
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 data-[highlighted]:bg-red-500 data-[highlighted]:text-white"
                  onClick={() => {
                    mutate();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardNavbar;
