import { CheckCircle, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeaturesSection = () => {
  return (
    <section className="px-6 py-28 bg-secondary">
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
          <Card className="p-8 bg-gradient-card rounded-3xl ring-1 ring-border backdrop-blur-sm border-border/50 shadow-soft/30 transition-all duration-300">
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

          <Card className="p-8 bg-gradient-card rounded-3xl ring-1 ring-border backdrop-blur-sm border-border/50 shadow-soft/30 transition-all duration-300">
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

          <Card className="p-8 bg-gradient-card rounded-3xl ring-1 ring-border backdrop-blur-sm border-border/50 shadow-soft/30 transition-all duration-300">
            <div className="space-y-4">
              <div className="bg-primary/10 p-3 rounded-lg w-fit">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Built for speed and performance. No lag, no waiting – just pure
                productivity.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
