import { Card, CardContent } from "@/components/ui/card";
import { Card as CardType } from "@/types/card.types";

export const TaskCard = ({ card }: { card: CardType }) => {
  return (
    <Card className="cursor-grab active:cursor-grabbing bg-card hover:shadow-soft border-border/50 h-20 rounded-sm ">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm text-foreground leading-snug">
              {card.title}
            </h4>
            {/* <Badge variant="secondary" className={`text-xs`}>
              {task.priority}
            </Badge> */}
          </div>

          {card.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {card.description}
            </p>
          )}

          {/* <div className="flex items-center justify-between text-xs text-muted-foreground">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
            )}

            {card.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(card.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div> */}
        </div>
      </CardContent>
    </Card>
  );

  return <>{card.title}</>;
};
