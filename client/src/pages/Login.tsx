import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/login/LoginForm";
import { Link } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Login = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="px-7 py-5">
        <Link to={"/"} className="flex items-center gap-2 w-fit">
          <div className="bg-gradient-primary p-2 rounded-lg shadow-primary/30 shadow-sm">
            <CircleCheckBig className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isMobile && (
            <span className="text-xl font-bold text-foreground">TaskFlow</span>
          )}
        </Link>
      </div>

      <div className="flex items-center justify-center py-20 px-6">
        <Card className="w-full max-w-md bg-card backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your TaskFlow account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
