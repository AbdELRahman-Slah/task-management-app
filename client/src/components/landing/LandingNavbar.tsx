import { Button } from "../ui/button";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

import { useIsMobile } from "@/hooks/use-mobile";

const LandingNavbar = () => {
  const isMobile = useIsMobile();

  return (
    <header>
      <nav className="bg-card backdrop-blur-sm border-b border-border/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={"/"} className="flex items-center gap-2">
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

            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="default" className="bg-gradient-primary">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
