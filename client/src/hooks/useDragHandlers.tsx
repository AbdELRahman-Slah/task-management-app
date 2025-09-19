import { BoardContext } from "@/contexts/BoardContext";
import { Card } from "@/types/card.types";
import { List } from "@/types/list.types";
import {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useContext, useState } from "react";
import useUpdateMultipleLists from "./lists/useUpdateMultipleLists";
import useUpdateMultipleCards from "./cards/useUpdateMultipleCards";

const useDragHandlers = () => {
  const { lists, setLists, cards, setCards } = useContext(BoardContext);
  const [activeList, setActiveList] = useState<List>();
  const [activeCard, setActiveCard] = useState<Card>();

  const { mutate: mutateMultipleLists, prevListsRef } =
    useUpdateMultipleLists();
  const {
    mutate: mutateMultipleCards,
    updateMultipleCards,
    prevCardsRef,
  } = useUpdateMultipleCards();

  const handleDragStart = ({ active }: DragStartEvent) => {
    const draggedList = active.data.current?.list;
    const draggedCard = active.data.current?.card;

    if (draggedList) {
      setActiveList(draggedList);
    }
    if (draggedCard) {
      setActiveCard(draggedCard);
    }

    prevListsRef.current = [...lists];
    prevCardsRef.current = [...cards];
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveList(null);
    setActiveCard(null);

    if (!over) {
      return;
    }

    if (
      active.data.current.type === "list" &&
      over.data.current.type === "list" &&
      active.id !== over.id
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

        mutateMultipleLists(newListsWithNewPostions);

        return newListsWithNewPostions;
      });
    }
    if (
      active.data.current.type === "card" &&
      over.data.current.type === "card"
    ) {
      if (active.data.current.card.listId === over.data.current.card.listId) {
        const listId = active.data.current.card.listId;

        let cardsCopy = [...cards];

        const oldIndex = cardsCopy.findIndex((card) => card._id === active.id);
        const newIndex = cardsCopy.findIndex((card) => card._id === over.id);

        cardsCopy = arrayMove(cardsCopy, oldIndex, newIndex);

        const cardsInList = cardsCopy.filter((card) => card.listId === listId);
        const restCards = cardsCopy.filter((card) => card.listId !== listId);

        const orderedCardsInOverList = cardsInList.map((card, idx) => {
          return {
            ...card,
            position: idx,
          };
        });

        const cardsInOldList = cardsCopy.filter(
          (card) => card.listId === active.data.current.card.listId
        );

        mutateMultipleCards([...orderedCardsInOverList, ...cardsInOldList]);

        setCards([...restCards, ...orderedCardsInOverList]);
      }
    }

    if (
      over.data.current.type === "list" &&
      active.data.current.type === "card"
    ) {
      const overListIndex = lists.findIndex((list) => list._id === over.id);
      const activeCardIndex = cards.findIndex((card) => card._id === active.id);

      const listLength = cards.filter(
        (card) => card.listId === lists[overListIndex]._id
      ).length;

      const cardsInActiveList = cards.filter(
        (card) => card.listId === cards[activeCardIndex].listId
      );

      const reorderedCardsInActiveList = cardsInActiveList.map((card, idx) => {
        return {
          ...card,
          position: idx,
        };
      });

      updateMultipleCards(reorderedCardsInActiveList);

      setCards((cards) => {
        cards[activeCardIndex].listId = lists[overListIndex]._id;

        cards[activeCardIndex].position = listLength;

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
      if (active.data.current.card.listId === over.data.current.card.listId) {
        const listId = active.data.current.card.listId;

        const cardsInList = cards.filter((card) => card.listId === listId);

        const reorderedCards = cardsInList.map((card, idx) => {
          return {
            ...card,
            position: idx,
          };
        });

        setCards((cards) => {
          const oldIndex = cards.findIndex((card) => card._id === active.id);
          const newIndex = cards.findIndex((card) => card._id === over.id);

          cards = cards.map((card) =>
            card.listId === listId
              ? reorderedCards.find((c) => c._id === card._id)
              : card
          );

          return arrayMove(cards, oldIndex, newIndex);
        });
      } else {
        const overCardIndex = cards.findIndex((card) => card._id === over.id);
        const activeCardIndex = cards.findIndex(
          (card) => card._id === active.id
        );
        setCards((cards) => {
          const activeCardListId = active.data.current.card.listId;
          const overCardListId = cards[overCardIndex].listId;
          cards[activeCardIndex].listId = overCardListId;
          const cardsInOverList = cards.filter(
            (card) => card.listId === overCardListId
          );
          const cardsInActiveList = cards.filter(
            (card) => card.listId === activeCardListId
          );
          const reorderedCardsInOverList = cardsInOverList.map((card, idx) => {
            return {
              ...card,
              position: idx,
            };
          });
          const reorderedCardsInActiveList = cardsInActiveList.map(
            (card, idx) => {
              return {
                ...card,
                position: idx,
              };
            }
          );
          const newCards = cards.map((card) => {
            if (card.listId === activeCardListId)
              return reorderedCardsInActiveList.find((c) => c._id === card._id);
            if (card.listId === overCardListId)
              return reorderedCardsInOverList.find((c) => c._id === card._id);
            return card;
          });

          return newCards;
        });
      }
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
    handleDragOver,
    handleDragEnd,
  };
};

export default useDragHandlers;
