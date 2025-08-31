import { BoardContext } from "@/contexts/BoardContext";
import { List, ListToUpdate } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateMultipleLists = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const updateMultipleListsMutation = useMutation({
    mutationFn: (listToUpdate: ListToUpdate[]) =>
      axios.patch(
        `${API_URL}/boards/${boardId}/lists`,
        { lists: listToUpdate },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
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
