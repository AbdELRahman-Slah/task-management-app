import { BoardContext } from "@/contexts/BoardContext";
import { Card, SingleCardApiResponse } from "@/types/card.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateCard = () => {
  const { boardId } = useParams();
  const { cards, setCards } = useContext(BoardContext);

  const queryClient = useQueryClient();

  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (cardData: Card) =>
      apiRequest<SingleCardApiResponse>(
        `${API_URL}/boards/${boardId}/cards/${cardData._id}`,
        {
          method: "PATCH",
          data: cardData,
        }
      ),

    onMutate: (cardData) => {
      const prevCard = cards.find((card) => card._id === cardData._id);
      setCards((cards) =>
        cards.map((c) => (c._id === cardData._id ? cardData : c))
      );

      return prevCard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });

      toast({
        title: "Card was updated successfully",
        variant: "default",
      });
    },

    onError: (error, cardData, prevCard) => {
      toast({
        title: "Error",
        description: "Error updating card",
        variant: "destructive",
      });

      setCards(
        cards.map((card) => (card._id === prevCard?._id ? prevCard : card))
      );
    },
  });

  const updateCard = (card: Card) => {
    mutation.mutate(card);
  };

  return { updateCard, ...mutation };
};

export default useUpdateCard;
