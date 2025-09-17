import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ListDropdownMenu from "./ListDropdownMenu";
import SortableCard from "./SortableCard";
import { BoardContext } from "@/contexts/BoardContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { List } from "@/types/list.types";

const TaskListOverlay = ({ list }: { list: List }) => {
  const { cards } = useContext(BoardContext);
  const listCards = cards.filter((card) => card.listId === list._id);

  return (
    <div className="h-full">
      <Card className="min-w-80 sm:min-w-96 max-h-full bg-gradient-card backdrop-blur-sm border-border/50 transition-all duration-200 flex flex-col rounded-md draggable-item">
        <CardHeader className="flex justify-between flex-row gap-3 items-center md:touch-none">
          <CardTitle className="text-sm font-semibold text-foreground flex-1">
            <div className="break-all w-full text-left">{list.title}</div>
          </CardTitle>

          <ListDropdownMenu listId={list._id} />
        </CardHeader>

        <CardContent className="py-0 px-4 flex flex-col gap-3 overflow-y-auto thin-scrollbar">
          {listCards.map((card) => (
            <SortableCard key={card._id} listId={list._id} card={card} />
          ))}
        </CardContent>

        <CardFooter className="py-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add a card
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskListOverlay;
