import { List, ListToUpdate } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "@/contexts/BoardContext";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateList = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const apiRequest = useApiRequest();

  const mutation = useMutation({
    mutationFn: (listToUpdate: ListToUpdate) =>
      apiRequest(`${API_URL}/boards/${boardId}/lists/${listToUpdate._id}`, {
        method: "PATCH",
        data: listToUpdate,
      }),
  });

  const updateList = (listToUpdate: List) => {
    setLists((lists) =>
      lists.map((list) => (list._id === listToUpdate._id ? listToUpdate : list))
    );

    mutation.mutate(listToUpdate);
  };

  return { updateList, ...mutation };
};

export default useUpdateList;
