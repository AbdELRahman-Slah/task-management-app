import { BoardContext } from "@/contexts/BoardContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteCard = () => {
  const { boardId } = useParams();
  const { cards, setCards } = useContext(BoardContext);

  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (cardId: string) =>
      apiRequest(`${API_URL}/boards/${boardId}/cards/${cardId}`, {
        method: "DELETE",
      }),
    onMutate: (cardId) => {
      const prevCard = cards.find((card) => card._id === cardId);
      const prevCardIndex = cards.findIndex((card) => card._id === cardId);

      setCards((cards) => cards.filter((card) => card._id !== cardId));

      return { prevCard, prevCardIndex };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });

      toast({
        title: "Card was deleted successfully",
        variant: "default",
      });
    },

    onError: (error, cardId, context) => {
      toast({
        title: "Error",
        description: "Error deleting card",
        variant: "destructive",
      });

      setCards((cards) => {
        cards.splice(context?.prevCardIndex, 0, context?.prevCard);

        return [...cards];
      });
    },
  });

  const deleteCard = (cardId: string) => {
    mutation.mutate(cardId);
  };

  return { deleteCard, ...mutation };
};

export default useDeleteCard;
