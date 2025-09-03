import { Button } from "./ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CircleCheckBig } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ref } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const Navbar = ({
  isLoggedIn,
  navbarRef = null,
}: {
  isLoggedIn: boolean;
  navbarRef?: Ref<HTMLElement>;
}) => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}/users/logout`);
    },
    onSuccess: () => {
      localStorage.clear();
      navigate("/");
    },
  });

  return (
    <nav
      className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4"
      ref={navbarRef}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="bg-gradient-primary p-2 rounded-lg shadow-primary">
            <CircleCheckBig className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">TaskFlow</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
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
                <Button className="bg-gradient-primary shadow-primary">
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
