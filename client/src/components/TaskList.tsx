import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  listId: string;
}

interface List {
  id: string;
  title: string;
  tasks: Task[];
}

interface TaskListProps {
  list: List;
}

export const TaskList = ({ list }: TaskListProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
  });

  return (
    <Card
      className={`min-w-[300px] bg-gradient-card backdrop-blur-sm border-border/50 transition-all duration-200 ${
        isOver ? "ring-2 ring-primary/50 shadow-primary" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-semibold text-foreground">
              {list.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {list.tasks.length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div ref={setNodeRef} className="space-y-2 min-h-[200px]">
          <SortableContext
            items={list.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {list.tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>

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
