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
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import useCreateCard from "@/hooks/cards/useCreateCard";

interface TaskListProps {
  list: List;
  setListHeight?: React.Dispatch<React.SetStateAction<number>>;
  setActivatorNodeRef?: (element: HTMLElement) => void;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  isTempList: boolean;
}

export const TaskList = memo(
  ({
    list,
    setActivatorNodeRef,
    attributes,
    listeners,
    setListHeight,
    isTempList,
  }: TaskListProps) => {
    const {
      isSuccess: isCardsSuccess,
      cards,
      isLoading: isCardsLoading,
    } = useGetCards();

    const { createCard, context: tempCard } = useCreateCard();

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
          className={cn(
            "min-w-80 sm:min-w-96 max-h-full bg-list shadow-sm border-border/50 transition-all duration-200 flex flex-col rounded-md draggable-item",
            isTempList && "opacity-90 pointer-events-none"
          )}
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
            {isCardsLoading && (
              <>
                <Skeleton className="rounded-sm h-20" />
                <Skeleton className="rounded-sm h-20" />
                <Skeleton className="rounded-sm h-20" />
              </>
            )}

            {isCardsSuccess && (
              <SortableContext
                items={cardIds}
                strategy={verticalListSortingStrategy}
              >
                {listCards.map((card) => (
                  <SortableCard
                    key={card._id}
                    listId={list._id}
                    card={card}
                    isTempCard={tempCard?._id === card._id}
                  />
                ))}
              </SortableContext>
            )}
          </CardContent>

          <CardFooter className="py-4">
            <AddNewCard
              cards={listCards}
              listId={list._id}
              createCard={createCard}
            />
          </CardFooter>
        </Card>
      </div>
    );
  }
);
