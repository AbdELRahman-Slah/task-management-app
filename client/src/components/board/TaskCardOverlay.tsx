import { Trash2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Card as CardType } from "@/types/card.types";

const TaskCardOverlay = ({ card }: { card: CardType }) => {
  return (
    <Card className="active:cursor-grabbing bg-card hover:shadow-soft border-border/50 h-20 rounded-sm md:touch-none">
      <CardContent className="p-4 h-full">
        <div className="flex items-start justify-between gap-2 h-full">
          <h4 className="font-medium text-sm text-foreground leading-snug">
            {card.title}
          </h4>
          <button className="self-center bg-gradient-card hover:bg-red-950 p-2 rounded">
            <Trash2Icon size={20} className="stroke-gray-300" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCardOverlay;
