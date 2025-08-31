import { BoardContext } from "@/contexts/BoardContext";
import { Card } from "@/types/card.types";
import { List } from "@/types/list.types";
import { DragStartEvent, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useContext, useState } from "react";
import useUpdateLists from "./lists/useUpdateLists";
import useUpdateMultipleCards from "./cards/useUpdateMultipleCards";

const useDragHandlers = () => {
  const { lists, setLists, cards, setCards } = useContext(BoardContext);
  const [activeList, setActiveList] = useState<List>();
  const [activeCard, setActiveCard] = useState<Card>();

  const { mutate: ListsMutate } = useUpdateLists();
  const { mutate: CardsMutate } = useUpdateMultipleCards();

  const handleDragStart = ({ active }: DragStartEvent) => {
    const draggedList = active.data.current?.list;
    const draggedCard = active.data.current?.card;

    if (draggedList) {
      setActiveList(draggedList);
    }
    if (draggedCard) {
      setActiveCard(draggedCard);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveList(null);
    setActiveCard(null);

    if (!over) {
      return;
    }

    if (
      active.data.current.type === "list" &&
      over.data.current.type === "list"
    ) {
      setLists((lists) => {
        const oldIndex = lists.findIndex(
          (list) => list._id === active.data.current.list._id
        );
        const newIndex = lists.findIndex(
          (list) => list._id === over.data.current.list._id
        );

        lists[oldIndex].position = newIndex;
        lists[newIndex].position = oldIndex;

        const newLists = arrayMove(lists, oldIndex, newIndex);

        const newListsWithNewPostions = newLists.map((list, idx) => {
          return {
            ...list,
            position: idx,
          };
        });

        ListsMutate(newListsWithNewPostions);

        return newListsWithNewPostions;
      });
    }
    if (
      active.data.current.type === "card" &&
      over.data.current.type === "card"
    ) {
      const overCardIndex = cards.findIndex((card) => card._id === over.id);
      const activeCardIndex = cards.findIndex((card) => card._id === active.id);

      setCards((cards) => {
        cards[activeCardIndex].listId = cards[overCardIndex].listId;

        cards[activeCardIndex].position = overCardIndex;
        cards[overCardIndex].position = activeCardIndex;

        const newCards = arrayMove(cards, activeCardIndex, overCardIndex);

        const newCardsWithNewPostions = newCards.map((card, idx) => {
          return {
            ...card,
            position: idx,
          };
        });

        CardsMutate(newCardsWithNewPostions);

        return newCardsWithNewPostions;
      });
    }

    if (
      over.data.current.type === "list" &&
      active.data.current.type === "card"
    ) {
      const overListIndex = lists.findIndex((list) => list._id === over.id);
      const activeCardIndex = cards.findIndex((card) => card._id === active.id);

      setCards((cards) => {
        cards[activeCardIndex].listId = lists[overListIndex]._id;

        cards[activeCardIndex].position = 0;

        return cards;
      });
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;

    if (active.data.current.type === "list") return;

    if (
      active.data.current.type === "card" &&
      over.data.current.type === "card"
    ) {
      const overCardIndex = cards.findIndex((card) => card._id === over.id);
      const activeCardIndex = cards.findIndex((card) => card._id === active.id);

      setCards((cards) => {
        cards[activeCardIndex].listId = cards[overCardIndex].listId;

        return arrayMove(cards, activeCardIndex, overCardIndex);
      });
    }

    if (
      over.data.current.type === "list" &&
      active.data.current.type === "card"
    ) {
      const overListIndex = lists.findIndex((list) => list._id === over.id);
      const activeCardIndex = cards.findIndex((card) => card._id === active.id);

      setCards((cards) => {
        cards[activeCardIndex].listId = lists[overListIndex]._id;

        return arrayMove(cards, activeCardIndex, activeCardIndex);
      });
    }
  };

  return {
    activeList,
    activeCard,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  };
};

export default useDragHandlers;
