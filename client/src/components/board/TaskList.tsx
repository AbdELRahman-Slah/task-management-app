import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DraggableAttributes } from "@dnd-kit/core";
import { List } from "@/types/list.types";
import ListHeader from "./ListHeader";
import ListDropdownMenu from "./ListDropdownMenu";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface TaskListProps {
  list: List;
  setActivatorNodeRef?: (element: HTMLElement) => void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

export const TaskList = ({
  list,
  setActivatorNodeRef,
  attributes,
  listeners,
}: TaskListProps) => {
  return (
    <Card className="min-w-96 bg-gradient-card backdrop-blur-sm border-border/50 transition-all duration-200 h-fit ">
      <CardHeader
        className="pb-3 flex justify-between flex-row gap-3 items-center"
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
      >
        <CardTitle className="text-sm font-semibold text-foreground flex-1">
          <ListHeader listTitle={list.title} listId={list._id} />
        </CardTitle>

          <ListDropdownMenu listId={list._id} />
      </CardHeader>

      <CardContent className="pt-0">
        <Button
          variant="ghost"
          className="w-full mt-3 justify-start text-muted-foreground hover:text-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a card
        </Button>
      </CardContent>
    </Card>
  );
};
