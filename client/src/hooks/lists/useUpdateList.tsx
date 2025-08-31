import { List, ListToUpdate } from "@/types/list.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BoardContext } from "@/contexts/BoardContext";

const API_URL = import.meta.env.VITE_API_URL;
const userToken = localStorage.getItem("token");

const useUpdateList = () => {
  const { boardId } = useParams();
  const { setLists } = useContext(BoardContext);

  const mutation = useMutation({
    mutationFn: (listToUpdate: ListToUpdate) =>
      axios.patch(
        `${API_URL}/boards/${boardId}/lists/${listToUpdate._id}`,
        listToUpdate,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      ),
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
