import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignupForm from "@/components/signup/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="flex items-center justify-center py-20 px-6">
        <Card className="w-full max-w-md bg-card backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Join thousands of teams already using TaskFlow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
