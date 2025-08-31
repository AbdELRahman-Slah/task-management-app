import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "../../contexts/BoardContext";

const API_URL = import.meta.env.VITE_API_URL;

const useDeleteList = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const userToken = localStorage.getItem("token");

  const deleteListMutation = useMutation({
    mutationFn: (listId: string) =>
      axios.delete(`${API_URL}/boards/${boardId}/lists/${listId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }),
  });

  const deleteList = (listId: string) => {
    setLists((lists) => lists.filter((list) => list._id !== listId));
    deleteListMutation.mutate(listId);
  };

  return { deleteList, ...deleteListMutation };
};

export default useDeleteList;
