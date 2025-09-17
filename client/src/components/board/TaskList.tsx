import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DraggableAttributes } from "@dnd-kit/core";
import { List } from "@/types/list.types";
import ListHeader from "./ListHeader";
import ListDropdownMenu from "./ListDropdownMenu";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import AddNewCard from "./AddNewCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCard from "./SortableCard";
import React, { memo, useEffect, useMemo, useRef } from "react";
import useGetCards from "@/hooks/cards/useGetCards";

interface TaskListProps {
  list: List;
  setListHeight?: React.Dispatch<React.SetStateAction<number>>;
  setActivatorNodeRef?: (element: HTMLElement) => void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

export const TaskList = memo(
  ({
    list,
    setActivatorNodeRef,
    attributes,
    listeners,
    setListHeight,
  }: TaskListProps) => {
    const { isSuccess: isCardsSuccess, cards } = useGetCards();

    const listCards = useMemo(() => {
      return cards.filter((card) => card.listId === list._id);
    }, [cards, list._id]);

    const cardIds = useMemo(() => {
      return listCards.map((card) => card._id);
    }, [listCards]);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (listRef.current && setListHeight) {
        setListHeight(listRef.current.clientHeight);
      }
    }, [listRef, setListHeight, cards]);

    return (
      <div className="h-full">
        <Card
          className="min-w-80 sm:min-w-96 max-h-full bg-gradient-card backdrop-blur-sm border-border/50 transition-all duration-200 flex flex-col rounded-md draggable-item"
          ref={listRef}
        >
          <CardHeader
            className="flex justify-between flex-row gap-3 items-center md:touch-none"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <CardTitle className="text-sm font-semibold text-foreground flex-1">
              <ListHeader list={list} />
            </CardTitle>

            <ListDropdownMenu listId={list._id} />
          </CardHeader>

          <CardContent className="py-0 px-4 flex flex-col gap-3 overflow-y-auto thin-scrollbar">
            <SortableContext
              items={cardIds}
              strategy={verticalListSortingStrategy}
            >
              {listCards.map((card) => (
                <SortableCard key={card._id} listId={list._id} card={card} />
              ))}
            </SortableContext>
          </CardContent>

          <CardFooter className="py-4">
            <AddNewCard cards={listCards} listId={list._id} />
          </CardFooter>
        </Card>
      </div>
    );
  }
);
