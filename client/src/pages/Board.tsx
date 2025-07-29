import { useLayoutEffect, useRef, useState } from "react";
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
import { TaskCard } from "@/components/board/TaskCard";
import { TaskList } from "@/components/board/TaskList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddNewList from "@/components/board/AddNewList";
import { Card as CardType } from "@/types/card.types";
import { ListsApiResponse } from "@/types/list.types";
import ScrollContainer from "react-indiana-drag-scroll";
const API_URL = import.meta.env.VITE_API_URL;

const Board = () => {
  const { boardId } = useParams();
  const [activeTask, setActiveTask] = useState<CardType | null>(null);
  const [boardHeight, setBoardHeight] = useState(0);
  const navbarRef = useRef<HTMLElement>(null);
  const userToken = localStorage.getItem("token");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["lists"],
    queryFn: () =>
      axios.get<ListsApiResponse>(`${API_URL}/boards/${boardId}/lists`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
  });

  useLayoutEffect(() => {
    const { height } = navbarRef.current.getBoundingClientRect();

    const boardHeight = window.innerHeight - height - 64 - 32;

    setBoardHeight(boardHeight);
  }, [setBoardHeight]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background">
      <Navbar isLoggedIn={true} navbarRef={navbarRef} />
      <div className={`mx-auto pt-8`} style={{ height: boardHeight }}>
        <div className="mb-8 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Board Title</h1>
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

        {/* <DndContext
        // collisionDetection={closestCorners}
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        > */}
        <ScrollContainer
          className="flex gap-6 px-6 overflow-x-auto select-none flex-grow pb-16 h-full"
          horizontal
          vertical={false}
          hideScrollbars={false}
          ignoreElements="div"
        >
          {data &&
            data.data.data.lists.map((list) => (
              <TaskList key={list._id} list={list} />
            ))}

          {/* Add new list */}
          <AddNewList />
        </ScrollContainer>

        {/* <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay> */}
        {/* </DndContext> */}
      </div>
    </div>
  );
};

export default Board;
