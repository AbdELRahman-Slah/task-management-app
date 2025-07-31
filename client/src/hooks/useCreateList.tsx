import { ListsContext } from "@/contexts/ListsContext";
import { SingleListApiResponse } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;
const userToken = localStorage.getItem("token");

const useCreateList = () => {
  const { boardId } = useParams();
  const { lists, setLists } = useContext(ListsContext);

  const { isSuccess, isPending, mutate, isError, error } = useMutation({
    mutationFn: (listTitle: string) =>
      axios.post<SingleListApiResponse>(
        `${API_URL}/boards/${boardId}/lists`,
        { title: listTitle, position: lists.length },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),

    onSuccess: (data) => {
      const newList = data.data.data.list;
      setLists([...lists, newList]);

      toast({
        title: "List was added successfully",
        variant: "destructive",
      });
    },
  });

  return { isSuccess, isPending, mutate, isError, error };
};

export default useCreateList;
