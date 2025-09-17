import { List, ListToUpdate } from "@/types/list.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "@/contexts/BoardContext";
import useApiRequest from "../useApiRequest";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateList = () => {
  const { boardId } = useParams();
  const { setLists, lists } = useContext(BoardContext);

  const queryClient = useQueryClient();

  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (listToUpdate: ListToUpdate) =>
      apiRequest(`${API_URL}/boards/${boardId}/lists/${listToUpdate._id}`, {
        method: "PATCH",
        data: listToUpdate,
      }),
    onMutate: (listToUpdate) => {
      const prevList = lists.find((list) => list._id === listToUpdate._id);

      setLists((lists) =>
        lists.map((list) =>
          list._id === listToUpdate._id ? { ...list, ...listToUpdate } : list
        )
      );

      return prevList;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });

      toast({
        title: "List was updated successfully",
        variant: "default",
      });
    },

    onError: (_, listToUpdate, prevList) => {
      console.log(prevList._id);

      setLists((lists) =>
        lists.map((list) => (list._id === listToUpdate._id ? prevList : list))
      );

      toast({
        title: "Error",
        description: "Error updating list",
        variant: "destructive",
      });
    },
  });

  const updateList = (listToUpdate: List) => {
    mutation.mutate(listToUpdate);
  };

  return { updateList, ...mutation };
};

export default useUpdateList;
