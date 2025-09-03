import { BoardContext } from "@/contexts/BoardContext";
import { List, ListToUpdate } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import useApiRequest from "../useApiRequest";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateMultipleLists = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const apiRequest = useApiRequest();

  const updateMultipleListsMutation = useMutation({
    mutationFn: (listsToUpdate: ListToUpdate[]) =>
      apiRequest(`${API_URL}/boards/${boardId}/lists`, {
        method: "PATCH",
        data: { lists: listsToUpdate },
      }),
  });

  const updateMultipleLists = (updatedLists: List[]) => {
    setLists((lists) => {
      const updatedListIds = updatedLists.map((list) => list._id);
      return lists.map(
        (list) =>
          updatedListIds.includes(list._id)
            ? updatedLists.find((l) => l._id === list._id) // Find the updated list that has the same id as the old list
            : list // Return the old list if it's not updated
      );
    });
    updateMultipleListsMutation.mutate(updatedLists);
  };

  return { updateMultipleLists, ...updateMultipleListsMutation };
};

export default useUpdateMultipleLists;
