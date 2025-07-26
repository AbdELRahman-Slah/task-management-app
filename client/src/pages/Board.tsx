import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, User } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { TaskList } from "@/components/TaskList";

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

const Board = () => {
  const { boardId } = useParams();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [lists, setLists] = useState<List[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "1",
          title: "Design user interface",
          description: "Create mockups for the new dashboard",
          assignee: "John Doe",
          priority: "high",
          dueDate: "2024-02-01",
          listId: "todo",
        },
        {
          id: "2",
          title: "Setup project structure",
          description: "Initialize the React project with TypeScript",
          assignee: "Jane Smith",
          priority: "medium",
          listId: "todo",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [
        {
          id: "3",
          title: "Implement authentication",
          description: "Add login and signup functionality",
          assignee: "Mike Johnson",
          priority: "high",
          dueDate: "2024-01-28",
          listId: "inprogress",
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      tasks: [
        {
          id: "4",
          title: "Code review for API endpoints",
          description: "Review the REST API implementation",
          assignee: "Sarah Wilson",
          priority: "medium",
          listId: "review",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "5",
          title: "Setup development environment",
          description: "Configure all necessary tools and dependencies",
          assignee: "John Doe",
          priority: "low",
          listId: "done",
        },
      ],
    },
  ]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = lists
      .flatMap((list) => list.tasks)
      .find((task) => task.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being moved
    const activeTask = lists
      .flatMap((list) => list.tasks)
      .find((task) => task.id === activeId);
    if (!activeTask) return;

    // Find source and destination lists
    const sourceList = lists.find((list) =>
      list.tasks.some((task) => task.id === activeId)
    );
    const destList = lists.find(
      (list) =>
        list.id === overId || list.tasks.some((task) => task.id === overId)
    );

    if (!sourceList || !destList) return;

    setLists((prev) => {
      const newLists = [...prev];

      // Remove task from source list
      const sourceIndex = newLists.findIndex(
        (list) => list.id === sourceList.id
      );
      const taskIndex = newLists[sourceIndex].tasks.findIndex(
        (task) => task.id === activeId
      );
      const [movedTask] = newLists[sourceIndex].tasks.splice(taskIndex, 1);

      // Add task to destination list
      const destIndex = newLists.findIndex((list) => list.id === destList.id);
      movedTask.listId = destList.id;

      if (destList.tasks.some((task) => task.id === overId)) {
        // Insert at specific position
        const overIndex = newLists[destIndex].tasks.findIndex(
          (task) => task.id === overId
        );
        newLists[destIndex].tasks.splice(overIndex, 0, movedTask);
      } else {
        // Add to end of list
        newLists[destIndex].tasks.push(movedTask);
      }

      return newLists;
    });
  };

  const boardTitle =
    boardId === "1"
      ? "Website Redesign"
      : boardId === "2"
      ? "Mobile App Development"
      : boardId === "3"
      ? "Marketing Campaign"
      : "Product Launch";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={true} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{boardTitle}</h1>
            <p className="text-muted-foreground mt-1">
              Manage tasks and track progress
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["JD", "JS", "MJ", "SW"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-medium border-2 border-background"
                >
                  {initials}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>

        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6">
            {lists.map((list) => (
              <TaskList key={list.id} list={list} />
            ))}

            {/* Add new list */}
            <Card className="min-w-[300px] bg-gradient-card backdrop-blur-sm border-border/50 border-dashed">
              <CardContent className="p-4 h-fit">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add another list
                </Button>
              </CardContent>
            </Card>
          </div>

          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Board;
