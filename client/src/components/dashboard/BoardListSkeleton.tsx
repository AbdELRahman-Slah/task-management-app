import { Card, CardContent } from "../ui/card";

export const BoardListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(6)].map((_, idx) => (
        <Card
          key={idx}
          className="group hover:shadow-card transition-all duration-1000 overflow-hidden bg-card backdrop-blur-sm border-border/50 animate-pulse"
        >
          <div className="h-32 bg-muted relative">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
          </div>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="h-5 w-3/4 bg-muted rounded" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BoardListSkeleton;
