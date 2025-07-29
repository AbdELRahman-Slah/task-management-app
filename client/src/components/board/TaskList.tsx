import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, X } from "lucide-react";
import { TaskCard } from "@/components/board/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List } from "@/types/list.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import ListHeader from "./ListHeader";
import ListDropdownMenu from "./ListDropdownMenu";

interface TaskListProps {
  list: List;
}

export const TaskList = ({ list }: TaskListProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: list._id,
  });

  return (
    <Card
      className={`min-w-96 bg-gradient-card backdrop-blur-sm border-border/50 transition-all duration-200 h-fit ${
        isOver ? "ring-2 ring-primary/50 shadow-primary" : ""
      }`}
    >
      <CardHeader className="pb-3 flex justify-between flex-row gap-3 items-center ">
        <CardTitle className="text-sm font-semibold text-foreground flex-1">
          <ListHeader listTitle={list.title} listId={list._id} />
        </CardTitle>

        <ListDropdownMenu listId={list._id} />
      </CardHeader>

      <CardContent className="pt-0">
        {/* <div ref={setNodeRef} className="space-y-2 min-h-[200px]">
          <SortableContext
            items={list.cards.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {list.cards.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </div> */}

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
