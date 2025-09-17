import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card } from "@/types/card.types";
import { BoardContext } from "@/contexts/BoardContext";
import { useContext, useRef } from "react";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";


const API_URL = import.meta.env.VITE_API_URL;

const useUpdateMultipleCards = () => {
  const { boardId } = useParams();
  const { cards, setCards } = useContext(BoardContext);

  const prevCardsRef = useRef<Card[]>([]);

  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationKey: ["updateMultipleCards"],
    mutationFn: (cardsToUpdate: Card[]) => {
      return apiRequest(`${API_URL}/boards/${boardId}/cards`, {
        method: "PATCH",
        data: { cards: cardsToUpdate },
      });
    },
    onMutate: () => {
      const prevCards = prevCardsRef.current;

      return prevCards;
    },
    onSuccess: (_, cardsToUpdate) => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });

      toast({
        title: "Cards were updated successfully",
        variant: "default",
      });
    },
    onError: (error, cardsToUpdate, prevCards) => {
      toast({
        title: "Error",
        description: "Error updating cards",
        variant: "destructive",
      });

      setCards(prevCards);
    },
  });

  const updateMultipleCards = (cardsToUpdate: Card[]) => {
    setCards((cards) => {
      const updatedCardIds = cards.map((card) => card._id);
      return cards.map(
        (card) =>
          updatedCardIds.includes(card._id)
            ? cards.find((c) => c._id === card._id) // Find the updated card that has the same id as the old card
            : card // Return the old card if it's not updated
      );
    });

    console.log("cards", cards);
    console.log("prevCards", prevCardsRef.current);

    mutation.mutate(cardsToUpdate);
  };

  return { updateMultipleCards, ...mutation, prevCardsRef };
};

export default useUpdateMultipleCards;
