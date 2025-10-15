import { Button } from "../ui/button";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { CircleCheckBig, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ref } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import useLogout from "@/hooks/auth/useLogout";
import { SidebarTrigger } from "../ui/sidebar";

export const Navbar = ({
  isLoggedIn,
  navbarRef = null,
}: {
  isLoggedIn: boolean;
  navbarRef?: Ref<HTMLElement>;
}) => {
  const isMobile = useIsMobile();

  const { mutate } = useLogout();

  return (
    <nav
      className="bg-card backdrop-blur-sm border-b border-border/50 px-6 py-4"
      ref={navbarRef}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={isLoggedIn ? "/dashboard/boards" : "/"}
          className="flex items-center gap-2"
        >
          <div className="bg-gradient-primary p-2 rounded-lg shadow-primary/30 shadow-sm">
            <CircleCheckBig className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isMobile && (
            <span className="text-xl font-bold text-foreground">TaskFlow</span>
          )}
        </Link>

        <div className="flex items-center gap-4">
          {!isMobile && <ThemeToggle />}
          {isMobile && isLoggedIn && (
            <SidebarTrigger className="h-10 w-10" variant="outline" />
          )}

          {isLoggedIn ? (
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
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="bg-gradient-primary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
