import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="px-6 py-36">
      <div className="max-w-5xl mx-auto gap-12 items-center text-center">
        <div className="space-y-14">
          <div className="space-y-7">
            <h1 className="text-5xl lg:text-[75px] text-pretty !leading-[1.25] font-bold bg-gradient-hero bg-clip-text text-transparent">
              Organize Your Work, Amplify Your Impact
            </h1>
            <p className="text-xl max-w-4xl mx-auto text-muted-foreground !leading-relaxed">
              TaskFlow brings teams together with intuitive project management.
              From idea to execution, manage tasks with style and efficiency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center px-5 sm:p-0">
            <Link to="/signup">
              <Button
                size="lg"
                variant="default"
                className="w-full sm:w-auto bg-gradient-primary"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-accent/50 w-full sm:w-auto"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
