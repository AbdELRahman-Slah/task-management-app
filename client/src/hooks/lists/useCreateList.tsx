import { List, SingleListApiResponse } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { BoardContext } from "@/contexts/BoardContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const userToken = localStorage.getItem("token");

const useCreateList = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const createListMutation = useMutation({
    mutationFn: (listData: List) => {
      const listWithoutId = { ...listData };
      delete listWithoutId._id;

      return axios.post<SingleListApiResponse>(
        `${API_URL}/boards/${boardId}/lists`,
        listWithoutId,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
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
