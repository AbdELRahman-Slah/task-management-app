import { List, SingleListApiResponse } from "@/types/list.types";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { BoardContext } from "@/contexts/BoardContext";
import { useContext } from "react";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useCreateList = () => {
  const { boardId } = useParams();
  const { lists, setLists } = useContext(BoardContext);

  const queryClient = useQueryClient();

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
    onMutate: (listData) => {
      const prevList = lists.find((list) => list._id === listData._id);
      setLists((lists) =>
        lists.map((list) => (list._id === listData._id ? listData : list))
      );

      return prevList;
    },

    onSuccess: (data, list) => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });

      toast({
        title: "List was added successfully",
        variant: "default",
      });

      setLists((lists) => {
        const TempCreatedListId = list._id;

        const listsWithoutNewList = lists.filter(
          (list) => list._id !== TempCreatedListId
        );

        return [...listsWithoutNewList, data.data.data.list];
      });
    },

    onError: (error, listData, prevList) => {
      toast({
        title: "Error",
        description: "Error creating list",
        variant: "destructive",
      });

      setLists((lists) => {
        const TempCreatedListId = listData._id;

        const listsWithoutNewList = lists.filter(
          (list) => list._id !== TempCreatedListId
        );

        return [...listsWithoutNewList];
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
