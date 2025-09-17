import { BoardContext } from "@/contexts/BoardContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteMultipleCards = () => {
  const { boardId } = useParams();
  const { setCards } = useContext(BoardContext);

  const queryClient = useQueryClient();

  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (cardIds: string[]) =>
      apiRequest(`${API_URL}/boards/${boardId}/cards`, {
        method: "DELETE",
        data: { cardIds },
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });

      toast({
        title: "Cards were deleted successfully",
        variant: "default",
      });
    },

    onError: (error, cardIds) => {
      toast({
        title: "Error",
        description: "Error deleting card",
        variant: "destructive",
      });

      setCards((cards) => {
        const cardsWithoutDeletedCard = cards.filter(
          (card) => !cardIds.includes(card._id)
        );

        return [...cardsWithoutDeletedCard];
      });
    },
  });

  const deleteMultipleCards = (cardIds: string[]) => {
    setCards((cards) => cards.filter((card) => !cardIds.includes(card._id)));
    mutation.mutate(cardIds);
  };

  return { deleteMultipleCards, ...mutation };
};

export default useDeleteMultipleCards;
