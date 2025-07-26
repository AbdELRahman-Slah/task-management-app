import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, CheckCircle, Users, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { useEffect } from "react";

const isLoggedIn = Boolean(localStorage.getItem("token"));

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  if (isLoggedIn) {
    return;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={false} />

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                Organize Your Work, Amplify Your Impact
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                TaskFlow brings teams together with intuitive project
                management. From idea to execution, manage tasks with style and
                efficiency.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-primary shadow-primary hover:shadow-primary/70 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:bg-accent/50"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20"></div>
            <img
              src={heroImage}
              alt="TaskFlow Dashboard"
              className="relative rounded-3xl shadow-card w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Teams Choose TaskFlow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful, and designed for modern teams who value both
              productivity and aesthetics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intuitive Workflow</h3>
                <p className="text-muted-foreground">
                  Drag-and-drop simplicity meets powerful project management.
                  Organize tasks the way you think.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Real-time updates, shared boards, and seamless communication
                  keep everyone aligned.
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="space-y-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Built for speed and performance. No lag, no waiting – just
                  pure productivity.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
