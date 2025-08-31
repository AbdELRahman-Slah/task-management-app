import { BoardContext } from "@/contexts/BoardContext";
import { List } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useUpdateLists = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const updateListsMutation = useMutation({
    mutationFn: (listToUpdate: List[]) =>
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

  const updateLists = (updatedLists: List[]) => {
    setLists((lists) => {
      const updatedListIds = updatedLists.map((list) => list._id);
      return lists.map(
        (list) =>
          updatedListIds.includes(list._id)
            ? updatedLists.find((list) => list._id === list._id) // Find the updated list that has the same id as the old list
            : list // Return the old list if it's not updated
      );
    });
    updateListsMutation.mutate(updatedLists);
  };

  return { updateLists, ...updateListsMutation };
};

export default useUpdateLists;
