import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";
import useDeleteMultipleCards from "../cards/useDeleteMultipleCards";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteList = () => {
  const { boardId } = useParams();
  const { setLists, cards, lists } = useContext(BoardContext);
  const { deleteMultipleCards } = useDeleteMultipleCards();

  const queryClient = useQueryClient();

  const apiRequest = useApiRequest();

  const deleteListMutation = useMutation({
    mutationFn: (listId: string) =>
      apiRequest(`${API_URL}/boards/${boardId}/lists/${listId}`, {
        method: "DELETE",
      }),
    onMutate: (listId) => {
      const prevList = lists.find((list) => list._id === listId);
      setLists((lists) => lists.filter((list) => list._id !== listId));

      const cardsInList = cards.filter((card) => card.listId === listId);
      const cardsInListIds = cardsInList.map((card) => card._id);

      return { cardsInListIds, prevList };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });

      toast({
        title: "List was deleted successfully",
        variant: "default",
      });

      deleteMultipleCards(context?.cardsInListIds);
    },
    onError: (_, __, context) => {
      setLists((lists) => {
        lists.splice(context?.prevList.position, 0, context?.prevList);

        return [...lists];
      });

      toast({
        title: "Error",
        description: "Error deleting list",
        variant: "destructive",
      });
    },
  });

  const deleteList = (listId: string) => {
    deleteListMutation.mutate(listId);
  };

  return { deleteList, ...deleteListMutation };
};

export default useDeleteList;
