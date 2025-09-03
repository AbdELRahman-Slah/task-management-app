import { List, SingleListApiResponse } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { BoardContext } from "@/contexts/BoardContext";
import { useContext } from "react";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useCreateList = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const apiRequest = useApiRequest();

  const createListMutation = useMutation({
    mutationFn: (listData: List) => {
      const listWithoutId = { ...listData };
      delete listWithoutId._id;

      return apiRequest<SingleListApiResponse>(
        `${API_URL}/boards/${boardId}/lists`,
        {
          method: "POST",
          data: listWithoutId,
        }
      );
    },

    onSuccess: (data, list) => {
      toast({
        title: "List was added successfully",
        variant: "destructive",
      });

      setLists((lists) => {
        const TempCreatedListId = list._id;

        const listsWithoutNewList = lists.filter(
          (list) => list._id !== TempCreatedListId
        );

        return [...listsWithoutNewList, data.data.data.list];
      });
    },
  });

  const createList = (list: List) => {
    setLists((lists) => [...lists, list]);

    createListMutation.mutate(list);
  };

  return { createList, ...createListMutation };
};

export default useCreateList;
